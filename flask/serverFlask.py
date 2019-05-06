from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api, request
from json import dumps
from flask_jsonpify import jsonify
import pymysql

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

    #METHODES D'ACCES A LA BASE DE DONNEES

    def list_users(self):
        #Récupérer la liste des utilisateurs
        self.cur.execute("SELECT * FROM utilisateurs")
        result = self.cur.fetchall()
        return result

    def add_announcement(self,idUser,idInteret,description,title,scale):
        #Ajouter une annonce
        insert_stmt = (
          "INSERT INTO annonce (idUser, idInteret, description, titre, echelle, etat) "
          "VALUES (%s, %s, %s, %s, %s, 1)"
        ) #Le 1 à la fin indique que l'annonce est active.
        data = (idUser,idInteret,description,title,scale)
        self.cur.execute(insert_stmt, data)
        self.con.commit()
        # Rien à retourner


class Utilisateurs(Resource):
    def get(self):
        db = Database()
        emps = db.list_users()
        json = jsonify(emps)
        return json

class Annonce(Resource):
  def post(self):
        db = Database()
        args = request.get_json()
        print(args)
        db.add_announcement(args["idUser"],args["idInteret"],args["description"],args["title"],args["scale"])
        return 200




api.add_resource(Utilisateurs, '/utilisateurs') # Route_1
api.add_resource(Annonce,"/annonces") # Route 2


if __name__ == '__main__':
     app.run(port=5002)
