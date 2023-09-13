from flask import Flask
from flask_cors import CORS


# Routes
from routes import langchain_routes

app = Flask(__name__)
CORS(app, resources={'*': {'origins': '*'}})


@app.route('/', methods=['GET'])
def index():
    return "Hello, I'm Daiana and I'm at your service!"


def page_not_found(error):
    print(error)
    return '<h1>La página a la que intentas acceder no existe</h1>', 404


if( __name__) == '__main__':
    try:
        # Manejador de error
        app.register_error_handler(404, page_not_found)
        
        # Blueprints
        app.register_blueprint(langchain_routes.main, url_prefix='/api/langchain')

        from waitress import serve
        print('Server connected')
        serve(app, host="0.0.0.0", port=5000)
        # app.run(host='0.0.0.0', port=5000, debug=False)
    except Exception as ex:
        print(ex)