from flask import Flask, request, session
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import pymysql
import cryptography

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
    except (AttributeError, pymysql.OperationalError): # gerer les erreurs
        #__init__()
        cursor = self.con.cursor()
        cursor.execute(sql, args)
    return cursor #fetchall pour retourner des tuples / commit pour mettre à jour la db


#DEFINITION DES DIFFERENTES CLASSES POUR L'ACCES A LA BASE DE DONNEES
class Utilisateurs(Resource):
    def get(self):
      """
      Commande GET à la route /utilisateurs
      :return: Le json de tous les utilisateurs
      """
      db = Database()
      cursor = db.query("SELECT * FROM utilisateurs")
      emps = cursor.fetchall()
      json = jsonify(emps)
      return json

class Annonce(Resource):
  def post(self):
    """
    Commande POST à la route /annonces
    :effet: Ajoute une entrée dans la table annonce
    :return: code 200
    """
    db = Database()
    args = request.get_json()
    insert_stmt = (
      "INSERT INTO annonce (idUser, idInteret, description, titre, echelle, etat) "
      "VALUES (%s, %s, %s, %s, %s, 1)"
    )  # Le 1 à la fin indique que l'annonce est active.
    data = (args["idUser"],args["idInteret"],args["description"],args["title"],args["scale"])
    cursor = db.query(insert_stmt,data)
    cursor.commit()
    return 200


class Login(Resource):
  def get(self):
    """
    Commande GET à la route /login
    :return: données de l'utilisateurs ou warning si non connecté
    """
    message = None
    global notifications
    if notifications:
      message = notifications
      notifications = None
    if 'idUser' not in session:  #Si utilisateur non connecté
      message = {'message': 'Please log in', 'type': 'warning'}
      return jsonify("/login")  # URL de login a utiliser sur angular
    return jsonify("envoie des donnees de l'utilisateur")  # Si l'utilisateur est dans la session

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


#Attribution des classes aux routes
api.add_resource(Utilisateurs, '/utilisateurs')
api.add_resource(Annonce,"/annonces")
api.add_resource(Login, '/login')
api.add_resource(Interets,'/interests')

if __name__ == '__main__':
     app.run(port=5002)
