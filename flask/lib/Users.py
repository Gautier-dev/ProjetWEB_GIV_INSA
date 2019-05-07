from flask import Flask, render_template, request, jsonify, session, redirect, escape, url_for
import bcrypt


class ServerError(Exception):
  pass

def loginForm(db, form):
    error = None
    try:
        idUser = form['idUser']
        cur = db.query("SELECT COUNT(*) FROM utilisateurs WHERE idUser = %s", [idUser])# verifier []

        if not cur.fetchone()[0]:
            raise ServerError('Incorrect username / password')

        password = form['password']
        cur = db.query("SELECT password FROM utilisateurs WHERE idUser = %s", [idUser])

        for row in cur.fetchall():
            if bcrypt.hashpw(password.encode('utf-8'), row[0]) == row[0]: #TODO : voir
                session['idUser'] = form['idUser']# on associe idUser a sa valeur dans une session, si la session est modifiee session.modified = True
                return error

        raise ServerError('Incorrect username / password')
    except ServerError as e:
      error = str(e)
      return error

def registerUser(db, form, ROUNDS):
    error = None
    try:
      username = form['idUser']
      password = form['password']
      email    = form['mail']

      if not username or not password or not email:
        raise ServerError('Fill in all fields')

      password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(ROUNDS))

      cur = db.query("SELECT COUNT(*) FROM users WHERE user = %s", [username])
      c = cur.fetchone()
      if c[0] == 0:
        cur = db.query("INSERT INTO utilisateur (`idUser`, `mail`, `password`) VALUES (%s,%s,%s)", [username, email, password])
        cur.commit()
        return None
      else:
        return "User exists"
    except ServerError as e:
      error = str(e)
      return error

def getUsers(db):
    error = None
    try:
        userlist = []
        cur = db.query("SELECT idUser, mail FROM utilisateurs")
        for row in cur.fetchall():
            userlist.append({'name': row[0], 'email': row[1]})
        return userlist
    except:
        error = "Failed"
        return error

def deleteUser(db, user):
    error = None
    try:
      cur = db.query("DELETE FROM utilisateur WHERE idUser = %s", [user])
      return None
    except:
      return "Failed"
