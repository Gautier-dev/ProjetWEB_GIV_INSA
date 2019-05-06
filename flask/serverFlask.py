from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api, session
from json import dumps
from flask_jsonpify import jsonify
import pymysql
import lib.Users as Users


app = Flask(__name__)
api = Api(app)

CORS(app)
class ServerError(Exception): pass

class Database:
    def __init__(self):
        #Initialisation de la connexion à la base de données
        config = {}
        execfile("config.conf", config) #TODO : erreur a verifier

        host = config['db_host']
        user = config['db_user']
        password = config['db_pass']
        db = config['db_data']
        self.conn = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.
                                   DictCursor)
        self.conn.autocommit(True)
        self.conn.set_character_set('utf8')


    #METHODES D'ACCES A LA BASE DE DONNEES



    def query(self, sql, args=None):
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, args)
        except (AttributeError, pymysql.OperationalError): # gerer les erreurs 
            #__init__()
            cursor = self.conn.cursor()
            cursor.execute(sql, args)
        return cursor #fetchall pour retourner des tuples

"""
class Utilisateurs(Resource):
    def get(self):
        db = Database()
        emps = db.list_users()
        json = jsonify(emps)
        return json """

class login(Resource):
  def get(self):
    message = None
    global notifications
    if notifications:
      message = notifications
      notifications = None
    if 'idUser' not in session:
      message = {'message': 'Please log in', 'type': 'warning'}
      return jsonify("/login")# URL de login a utiliser sur angular

    return jsonify("envoie des donnees de l'utilisateur")# Si l'utilisateur est dans la session

class Utilisateurs(Resource):
  def get(self):
    message = None
    global notifications
    if notifications:
      message = notifications
      notifications = None
    if 'idUser' not in session:
      notifications = {'message': 'Please log in', 'type': 'warning'}
      return jsonify("/login")
    if session['idUser'] != 'admin':
      return jsonify("PageErreurAdmin")
    db = Database()
    users = Users.getUsers(db)
    if not users:
      notifications = {'message': 'Failed to retrieve users', 'type': 'error'}
      return jsonify("PageErreurPasUser")
    return jsonify("PageTouslesUtilisateurs")



api.add_resource(Utilisateurs, '/utilisateurs') # Route_1
api.add_resource(login, '/login')

if __name__ == '__main__':
     app.run(port=5002)
