from flask import Blueprint
import datetime
import json


main=Blueprint('example_blueprint', __name__)


@main.route('/example', methods=['GET'])
def function_example():
    try:
        return { 'ok': True }
    
    except Exception as exception:
        print(exception)
        return { 'ok': False }
