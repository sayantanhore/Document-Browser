from . import api
from .helpers import Links, Resource
from .jwt import is_verified
from flask import make_response, render_template

index_links = Links(condition=lambda x: is_verified())


@api.route("/")
class Index(Resource):

    # Explicitly remove jwt_required decorator
    method_decorators = []

    @index_links
    def get(self):
        return make_response(render_template("index.html"), 200, {'Content-Type': 'text/html'})
