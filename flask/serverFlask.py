from flask import Flask, request, session, make_response
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import pymysql
import bcrypt
import cryptography
from random import randint

app = Flask(__name__)
api = Api(app)

CORS(app)

class Database:
  """
  Cette classe définit la base de données.
  Dans le constructeur, on initie la connexion avec la base de données.
  La méthode query permet de faire des requêtes SQL à la base de données.
  """
  def __init__(self):
      #Initialisation de la connexion à la base de données
      host = "localhost"
      user = "root"
      password = "123"
      db = "givinsa"
      self.con = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.
                                 DictCursor)
      self.cur = self.con.cursor()
      self.con.autocommit(True)

    #METHODE D'ACCES A LA BASE DE DONNEES

  def query(self, sql, args=None):
    """

    :param sql: Le corps de la requête (ex : "INSERT ..." ou "SELECT %s FROM %s"
    :param args: Les arguments de la requête (ex : (nomChamp,table))
    :return: Un curseur duquel on peut récupérer des données ou commit une nouvelle entrée.
    """
    try:
        cursor = self.con.cursor()
        cursor.execute(sql, args)
    except (AttributeError, pymysql.OperationalError, pymysql.MySQLError) as e: # gerer les erreurs
      print('Got error {!r}, errno is {}'.format(e, e.args[0]))
      cursor = self.con.cursor()
      cursor.execute(sql, args)
    return cursor #fetchall pour retourner des tuples / commit pour mettre à jour la db

class ServerError(Exception):
    pass

def registerUser(db, form, ROUNDS):
  error = None
  username = form['idUser']
  password = form['password']
  email = form['mail']
  idQuartier = form['idQuartier']

  password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(ROUNDS))

  cur = db.query("SELECT COUNT(*) FROM utilisateurs WHERE idUser = %s", [username])
  c = cur.fetchone()
  if c['COUNT(*)'] == 0:
    cur = db.query("INSERT INTO utilisateurs (`idUser`, `mail`, `password`, `idQuartier`) VALUES (%s,%s,%s,%s)",
                   (username, email, password, idQuartier))
    return True
  else:
    return False

def loginForm(db, form):
    error = None
    try:
        idUser = form['idUser']
        cur = db.query("SELECT COUNT(*) FROM utilisateurs WHERE idUser = %s", [idUser])  #On regarde si le pseudo existe

        if not cur.fetchone()['COUNT(*)']: #Le pseudo n'existe pas.
            raise ServerError('Incorrect username / password')

        password = form['password']
        cur = db.query("SELECT password FROM utilisateurs WHERE idUser = %s", [idUser])  # On récupère le mot de passe.

        for row in cur.fetchall():
            if bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(10)) == row['password']:
                session['idUser'] = form['idUser']  # on associe idUser a sa valeur dans une session, si la session est modifiee session.modified = True
            return error

        raise ServerError('Incorrect username / password')
    except ServerError as e:
        error = str(e)
        return error


#DEFINITION DES DIFFERENTES CLASSES POUR L'ACCES A LA BASE DE DONNEES
class Utilisateurs(Resource):
    def get(self):
      """
      Commande GET à la route /utilisateurs
      :return: Le json de tous les utilisateurs
      """
      db = Database()
      cursor = db.query(
        "SELECT u.idUser, u.idQuartier, q.arrondissement FROM utilisateurs as u, quartiers as q WHERE q.idQuartier = u.idQuartier")
      emps = cursor.fetchall()
      json = jsonify(emps)
      return json

class PostAnnonce(Resource):
  def get(self,id):
    """
    Commande GET à la route /annonces/id
    :effet: Donne toutes les annonces d'un utilisateur
    :return: Le json de ces annonces
    """
    db = Database()
    cursor = db.query("SELECT * FROM annonce WHERE idUser = %s",id)
    emps = cursor.fetchall()
    json = jsonify(emps)
    return json

  def post(self,id):
    """
    Commande POST à la route /annonces/id
    :effet: Ajoute une entrée dans la table annonce
    :return: réussite ou non
    """
    try:
      db = Database()
      args = request.get_json()
      insert_stmt = (
        "INSERT INTO annonce (idUser, idInteret, description, titre, echelle, etat) "
        "VALUES (%s, %s, %s, %s, %s, 1)"
      )  # Le 1 à la fin indique que l'annonce est active.
      data = (id,args["idInteret"],args["description"],args["title"],args["scale"])
      cursor = db.query(insert_stmt,data)
      return True
    except:
      return False

  def put(self,id):
    """
    Commande PUT à la route /annonces/id
    :effet: Passe l'annonce en "en attente de don" (donc si il y a eu une demande) ou en "libre"
    :return: True ou False
    """
    try:
      db = Database()
      args = request.get_json()
      etat = args["etat"]
      _ = db.query("UPDATE annonce SET etat = {} WHERE idAnnonce = {}".format(etat,id))
      return True
    except:
      return False

  def delete(self,id):
    """
    Commande DELETE à la route /annonces/id
    :effet: Supprime l'annonce ayant comme idAnnonce id.
    :return: True ou False selon la réussite
    """
    try:
      db = Database()
      _ = db.query("DELETE FROM annonce WHERE idAnnonce = %s",id)
      return True
    except:
      return False

class VoirAnnonces(Resource):
  def get(self,nomInteret,idQuartier):
    """
    Commande GET à la route /annonces/nomInteret/idQuartier
    :return: Les annonces qui pourraient intéresser l'utilisateur
    """
    db = Database()
    cursor = db.query(
      '''SELECT * FROM annonce as a 
      INNER JOIN interets as i ON i.idInteret = a.idInteret
      INNER JOIN utilisateurs as u ON u.idUser = a.idUser
      INNER JOIN quartiers as q ON q.idQuartier = u.idQuartier
      WHERE i.nom = %s
      AND (a.echelle = 3 
      OR (a.echelle = 2 AND q.arrondissement = (SELECT q.arrondissement FROM quartiers as q WHERE q.idQuartier = %s))
      OR (a.echelle = 1 AND u.idQuartier = %s))''',
      (nomInteret,idQuartier,idQuartier)
    )
    emps = cursor.fetchall()
    json = jsonify(emps)
    return json

class Login(Resource):
  def post(self):
    """
    Commande POST à la route /login
    :return: Une réponse avec un cookie ou False en fonction de si on a réussi à se connecter ou pas.
    """
    db = Database()
    form = request.get_json()
    result = loginForm(db, form) #On a un resultat SSI il y a eu une erreur
    if not result:
        cookieValue = randint(100,10000000)
        response = {'success' : True, 'cookieValue' : str(cookieValue)}
        # Insertion de la valeur du cookie dans la base de données
        idUser = form['idUser']
        cur = db.query("SELECT COUNT(*) FROM cookies WHERE idUser = %s",
                       [idUser])  # On regarde si le pseudo existe

        if not cur.fetchone()['COUNT(*)']:  # Le pseudo n'existe pas.
            _ = db.query("INSERT INTO cookies (idUser, value) VALUES (%s,%s)",(idUser,cookieValue))
            # Il est possible que valueCookie existe déjà dans la table, auquel cas il y aura un échec !
            # Il faut aussi prévoir de nettoyer la table des cookies périodiquement.
        else: # Le pseudo existe déjà dans la bdd : on update la valeur du cookie
            _ = db.query("UPDATE cookies SET value = %s WHERE idUser = %s ",(cookieValue,idUser))
        return response
    else:
      response = {'success': False, 'cookieValue' : None}
      return response

class Interets(Resource):
  def get(self):
    """
    Commande GET à la route /interests
    :return: Le json de tous les intérêts avec leurs codes
    """
    db = Database()
    cursor = db.query("SELECT * FROM interets")
    emps = cursor.fetchall()
    json = jsonify(emps)
    return json


class Register(Resource):
  def post(self):
    """
    Commande POST à la route /signup
    :return: True ou False en fonction du résultat
    """
    try:
      db = Database()
      print(request.get_json())
      result = registerUser(db,request.get_json(),10)  #10 = cryptage
      return result
    except:
      return False

class Quartiers(Resource):
  def get(self):
    """
    Commmande GET à la route /quartiers
    :return: le json de la table quartiers
    """
    db = Database()
    cursor = db.query("SELECT * FROM quartiers")
    emps = cursor.fetchall()
    json = jsonify(emps)
    return json

class Utilisateur(Resource):
  def get(self,idUser,toutVoir):
    """
    Commande GET à la route /utilisateurs/<id>/<toutVoir>
    toutVoir = 0 si vision partielle, 1 si totale, 2 si l'on souhaite avoir les demandes reçues par l'utilisateur.
    :return: Les informations de l'utilisateur (y compris son arrondissement)
    """
    db = Database()
    if toutVoir == 0:
      cursor = db.query(
        "SELECT u.idQuartier, q.arrondissement FROM utilisateurs as u, quartiers as q WHERE u.idUser = %s AND u.idQuartier = q.idQuartier",(idUser))
    elif toutVoir == 1:
      cursor = db.query(
        "SELECT u.idQuartier, q.arrondissement, u.prenom, u.nom, u.mail, u.telephone FROM utilisateurs as u, quartiers as q WHERE u.idUser = %s AND u.idQuartier = q.idQuartier",(idUser))
    elif toutVoir == 2:
      cursor = db.query("SELECT idUser1 FROM contacts WHERE idUser2 = %s AND relation = 0",idUser)
    emps = cursor.fetchall()
    json = jsonify(emps)
    return json

  def put(self,idUser,toutVoir):
    """
    Commande PUT à la route /utilisateurs/<id>/<toutVoir> (deuxième argument inutile ici)
    Format json des datas envoyées : { changed : <champ changé>, to : <valeur> }
    :return: True si la mise à jour des informations réussit, False sinon.
    """
    try:
      db = Database()
      args = request.get_json()
      changed = args["changed"]
      to = args["to"]
      _ = db.query("UPDATE utilisateurs SET {} = '{}' WHERE idUser = '{}'".format(changed,to,idUser))
      return True
    except:
      return False

class Contact(Resource):
  def get(self,idUser1,idUser2):
    """
    Commande GET à la route /contact/<id1><id2>
    :return: Renvoie la valeur de la relation entre les deux utilisateurs (-1 = aucune entrée, 0 = demande d'ami de id1, 1 = amitié, 2 = bloqué)
    Bloqué = retour à "aucune amitié" mais il est toujours possible de redemander le contact.
    """
    db = Database()
    cursor = db.query(
      "SELECT relation, idUser1 FROM contacts WHERE (idUser1 = %s AND idUser2 = %s) OR (idUser1 = %s AND idUser2 = %s)",
      (idUser1,idUser2,idUser2,idUser1))
    emps = cursor.fetchall()
    if emps == ():
      return {'relation': -1, 'demandeur': None}
    else:
      return {'relation': emps[0]["relation"], 'demandeur': emps[0]["idUser1"]}

  def post(self,idUser1,idUser2):
    """
    Commande POST à la route /contact/<id1><id2>
    :return: Modifie la valeur de la relation entre les deux utilisateurs. True si réussi, False sinon.
    """
    try:
      db = Database()
      args = request.get_json()
      valeur = args["relation"]
      cur = db.query("SELECT COUNT(*) FROM contacts WHERE idUser1 = %s AND idUser2 = %s", (idUser1,idUser2))
      c = cur.fetchone()
      if c['COUNT(*)'] == 0:
        cur = db.query("INSERT INTO contacts VALUES (%s,%s,%s)",(idUser1,idUser2,valeur))
      else:
        _ = db.query(
          "UPDATE contacts SET relation=%s WHERE (idUser1 = %s AND idUser2 = %s) OR (idUser1 = %s AND idUser2 = %s)",
          (valeur,idUser1, idUser2, idUser2, idUser1))
      return True
    except:
      return False

  def delete(self,idUser1,idUser2):
    """
    Commande DELETE à la route /contact/<id1>/<id2>
    :return: True ou False
    """
    try:
      db = Database()
      _ = db.query("DELETE FROM contacts WHERE (idUser1 = %s AND idUser2 = %s) OR (idUser1 = %s AND idUser2 = %s)",
                     (idUser1, idUser2, idUser2, idUser1))
      return True
    except:
      return False

class QuiEstCe(Resource):
  def get(self, cookieValue):
    """
    Commande post à la route /whoisit/<cookieValue>
    :return: L'id de l'utilisateur
    """
    db = Database()
    cur = db.query("SELECT COUNT(*) FROM cookies WHERE value = %s",
                   cookieValue)  # On regarde si le pseudo existe
    if not cur.fetchone()['COUNT(*)']:  # Le pseudo n'existe pas.
      return {'success': False, 'idUser': ''}
    else:
      cursor = db.query("SELECT idUser FROM cookies WHERE value=%s", cookieValue)
      emps = cursor.fetchall()
      return {'success': True, 'idUser': emps[0]['idUser']}

class QuartierUser(Resource):
  def get(self, user):
    """
    Commande post à la route /quartier/<user>
    :return: quartier de l'utilisateur
    """
    db = Database()
    cur = db.query("SELECT COUNT(*) FROM cookies WHERE value = %s",
                   cookieValue)  # On regarde si le pseudo existe
    if not cur.fetchone()['COUNT(*)']:  # Le pseudo n'existe pas.
      return {'success': False, 'idUser': ''}
    else:
      cur2 = db.query("SELECT idQuartier FROM utilisateur WHERE idUser = %s", user)
      res = cur2.fetchall()
      return {'success': True, 'idUser': res[0]['idQuartier']}





class AuRevoir(Resource):
  def delete(self,cookieValue):
    """
    Commande post à la route /goodbye/<cookieValue>
    :return: True ou False selon la réussite. L'entrée aura été supprimée de la table cookies.
    """
    try:
      db = Database()
      _ = db.query("DELETE FROM cookies WHERE value = %s",cookieValue)
      return True
    except:
      return False


#Attribution des classes aux routes
api.add_resource(Utilisateurs, '/utilisateurs')
api.add_resource(PostAnnonce,"/annonces/<string:id>")
api.add_resource(VoirAnnonces,"/annonces/<string:nomInteret>/<string:idQuartier>")
api.add_resource(Login, '/login')
api.add_resource(Interets,'/interests')
api.add_resource(Register,"/signup")
api.add_resource(Quartiers,'/quartiers')
api.add_resource(Utilisateur,'/utilisateur/<string:idUser>/<int:toutVoir>')
api.add_resource(Contact,'/contact/<string:idUser1>/<string:idUser2>')
api.add_resource(QuiEstCe,'/whois/<string:cookieValue>')
api.add_resource(AuRevoir,'/goodbye/<string:cookieValue>')
api.add_resource(QuartierUser,'/quartier/<string:user>')

if __name__ == '__main__':
     app.run(port=5002)
