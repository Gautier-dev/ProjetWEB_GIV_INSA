from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
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


@app.route("/")
class Utilisateurs(Resource):
    def get(self):
        db = Database()
        emps = db.list_users()
        json = jsonify(emps)
        return json


api.add_resource(Utilisateurs, '/utilisateurs') # Route_1

if __name__ == '__main__':
     app.run(port=5002)
