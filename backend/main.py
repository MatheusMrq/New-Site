from flask import Flask, request, jsonify
from flask_cors import CORS
from termcolor import colored
import os
import mysql.connector
from datetime import datetime

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'mydb'
}

app = Flask(__name__)
CORS(app)
os.system('cls')

current_code = 0

def getcode():
    global current_code
    if current_code < 0:
        current_code = 1
    else:
        current_code += 1
    return f'{current_code}'

print(colored('''

             ██▓███ ▓██   ██▓▄▄▄█████▓ ██░ ██  ▒█████   ███▄    █         ██████   █████   ██▓    
            ▓██░  ██▒▒██  ██▒▓  ██▒ ▓▒▓██░ ██▒▒██▒  ██▒ ██ ▀█   █       ▒██    ▒ ▒██▓  ██▒▓██▒    
            ▓██░ ██▓▒ ▒██ ██░▒ ▓██░ ▒░▒██▀▀██░▒██░  ██▒▓██  ▀█ ██▒      ░ ▓██▄   ▒██▒  ██░▒██░    
            ▒██▄█▓▒ ▒ ░ ▐██▓░░ ▓██▓ ░ ░▓█ ░██ ▒██   ██░▓██▒  ▐▌██▒        ▒   ██▒░██  █▀ ░▒██░    
            ▒██▒ ░  ░ ░ ██▒▓░  ▒██▒ ░ ░▓█▒░██▓░ ████▓▒░▒██░   ▓██░      ▒██████▒▒░▒███▒█▄ ░██████▒
            ▒▓▒░ ░  ░  ██▒▒▒   ▒ ░░    ▒ ░░▒░▒░ ▒░▒░▒░ ░ ▒░   ▒ ▒       ▒ ▒▓▒ ▒ ░░░ ▒▒░ ▒ ░ ▒░▓  ░
            ░▒ ░     ▓██ ░▒░     ░     ▒ ░▒░ ░  ░ ▒ ▒░ ░ ░░   ░ ▒░      ░ ░▒  ░ ░ ░ ▒░  ░ ░ ░ ▒  ░
            ░░       ▒ ▒ ░░    ░       ░  ░░ ░░ ░ ░ ▒     ░   ░ ░       ░  ░  ░     ░   ░   ░ ░   
                     ░ ░               ░  ░  ░    ░ ░           ░             ░      ░        ░  ░
                     ░ ░                                                                          
\n   matheusmrq.github.io/Profile // mald1.github.com
''', 'light_green'))

#-----Students-----#
@app.route('/api/adicionar-aluno', methods=['POST'])
def adicionar_aluno():
    data = request.get_json()

    Anome = data.get('nome')
    AlastNome = data.get('lastNome')
    Amatricula = int(data.get('matricula'))
    Acurso = int(data.get('curso')) 
    code = getcode()

    text = f"--- CODE: {code} || Nome: {Anome}, Sobrenome: {AlastNome}, Matrícula: {Amatricula}, Curso: {Acurso}"
    finaltext = colored(text, 'light_green')
    print(finaltext)

    #Começando a conexão com o MySQL----------------------

    conexao = mysql.connector.connect(**db_config)
    cursor = conexao.cursor()
    comando = '''
    INSERT INTO students (first_name, last_name, matricula, courses_id)
    VALUES (%s, %s, %s, %s)
    '''
    cursor.execute(comando, (Anome, AlastNome, Amatricula, Acurso))
    conexao.commit()
    cursor.close()
    conexao.close()

    return jsonify({"message": "Aluno adicionado com sucesso!"}), 201

#-----Events-----#
@app.route('/api/adicionar-evento-data', methods=['POST'])
def adicionar_evento():
    data = request.get_json()
    Edata = data.get('rangeData') 
    Ealunos = data.get('alunos')

    if not Edata or " - " not in Edata:
        return jsonify({"error": "Formato de data inválido!"}), 400

    FinalDates = Edata.split(" - ")
    
    try:
        start_date = datetime.strptime(FinalDates[0], "%d/%m/%Y").date()
        end_date = datetime.strptime(FinalDates[1], "%d/%m/%Y").date()
    except ValueError:
        return jsonify({"error": "Formato de data inválido!"}), 400

    text = f"--- EVENTO CRIADO: INÍCIO: {start_date}, FIM: {end_date}"
    finaltext = colored(text, 'light_green')
    print(finaltext)

    # Iniciando a conexão com o MySQL
    try:
        conexao = mysql.connector.connect(**db_config)
        cursor = conexao.cursor()
        comando = '''
        INSERT INTO events (start_date, end_date)
        VALUES (%s, %s)
        '''
        cursor.execute(comando, (start_date, end_date))
        conexao.commit()
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conexao.close()

    return jsonify({"message": "Evento adicionado com sucesso!"}), 201

#-----Import dos Cursos para EXIBIR EM VINCULAR ALUNOS-----#
@app.route('/api/cursos', methods=['GET'])
def get_cursos():
    conexao = mysql.connector.connect(**db_config)
    cursor = conexao.cursor()

    cursor.execute("SELECT id, course_type FROM courses")
    cursos = cursor.fetchall()

    cursos_lista = [{"id": curso[0], "nome": curso[1]} for curso in cursos]

    cursor.close()
    conexao.close()

    return jsonify(cursos_lista)

#-----Import dos Alunos para ATRIBUIÇÕES-----#
@app.route('/api/alunos', methods=['GET'])
def get_alunos():
    conexao = mysql.connector.connect(**db_config)
    cursor = conexao.cursor()

    cursor.execute("SELECT id, first_name, last_name, matricula, courses_id FROM students")
    alunos = cursor.fetchall()

    alunos_lista = [{"id": aluno[0], "nome": f"{aluno[1]} {aluno[2]}", "matricula": aluno[3], "courses_id": aluno[4]} for aluno in alunos]

    cursor.close()
    conexao.close()

    return jsonify(alunos_lista)

#-----Import das Roles-----#
@app.route('/api/roles', methods=['GET'])
def get_roles():
    conexao = mysql.connector.connect(**db_config)
    cursor = conexao.cursor()

    cursor.execute("SELECT id, roles FROM roles")
    roles = cursor.fetchall()

    roles_lista = [{"id": role[0], "nome": role[1]} for role in roles]

    cursor.close()
    conexao.close()

    return jsonify(roles_lista)

#-----Atribuições-----#
@app.route('/api/atribu', methods=['POST'])
def atribu():
    data = request.get_json()  
    AAalunos = data.get('alunos')  # Obter a lista de alunos do corpo da requisição
    AAdata = data.get('rangeData')

    funcao = AAalunos[0]['funcao'] if AAalunos else None

    nome_funcao = funcao  

    if not nome_funcao:
        return jsonify({"error": "Nome da função não fornecido."}), 400

    conexao = mysql.connector.connect(**db_config)
    cursor = conexao.cursor()

    cursor.execute("SELECT id FROM roles WHERE roles = %s", (nome_funcao,))
    resultado = cursor.fetchone()

    cursor.close()
    conexao.close()

    ##################################Data
    AAFinalDates = AAdata.split(" - ")
    
    try:
        AAstart_date = datetime.strptime(AAFinalDates[0], "%d/%m/%Y").date()
        AAend_date = datetime.strptime(AAFinalDates[1], "%d/%m/%Y").date()
    except ValueError:
        return jsonify({"error": "Formato de data inválido!"}), 400

    if resultado:
        id_funcao = resultado[0]
        print(f"ID da função '{nome_funcao}': {id_funcao},     Data Inicial: {AAstart_date}, Final: {AAend_date}")

        conexao = mysql.connector.connect(**db_config)
        cursor = conexao.cursor()
        comando = '''
        INSERT INTO atribuitions (start_date, end_date, roles_id)
        VALUES (%s, %s, %s)
        '''
        cursor.execute(comando, (AAstart_date, AAend_date, id_funcao))
        conexao.commit()

        return jsonify({"nome": nome_funcao, "id": id_funcao})
    else:
        return jsonify({"error": "Função não encontrada."}), 404



if __name__ == '__main__':
    app.run(debug=True)
