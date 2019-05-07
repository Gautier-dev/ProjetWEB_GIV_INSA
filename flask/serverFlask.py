from flask import Flask, request, session
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import pymysql
import lib.Users as Users

app = Flask(__name__)
api = Api(app)

CORS(app)

class Database:
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
        self.con.set_character_set('utf8')

    #METHODE D'ACCES A LA BASE DE DONNEES

    def query(self, sql, args=None):
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
        db = Database()
        cursor = db.query("SELECT * FROM utilisateurs")
        emps = cursor.fetchall()
        json = jsonify(emps)
        return json

def users():
    message = None
    global notifications
    if notifications:
        message = notifications
        notifications = None
        """
    if 'username' not in session:
        notifications = {'message': 'Please log in', 'type': 'warning'}
        return jsonify("/login")
        """
    db = Database()
    users = Users.getUsers(db)
    return jsonify(users)

class Annonce(Resource):
  def post(self):
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
    db = Database()
    cursor = db.query("SELECT * FROM interets")
    emps = cursor.fetchall()
    json = jsonify(emps)
    return json


#Attribution des classes aux routes
api.add_resource(users, '/utilisateurs') # test fct
api.add_resource(Annonce,"/annonces")
api.add_resource(Login, '/login')
api.add_resource(Interets,'/interests')

if __name__ == '__main__':
     app.run(port=5002)
