import hashlib
import json
from datetime import datetime


class Blockchain:

    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):

        block = {
            "index": 1,
            "timestamp": str(datetime.now()),
            "action": "Genesis Block",
            "user": {},
            "document": {},
            "status": "Success",
            "ip_address": "",
            "previous_hash": "0"
        }

        block["current_hash"] = self.calculate_hash(block)

        self.chain.append(block)

    def calculate_hash(self, block):

        block_copy = block.copy()

        block_copy.pop("current_hash", None)

        encoded = json.dumps(
            block_copy,
            sort_keys=True
        ).encode()

        return hashlib.sha256(encoded).hexdigest()

    def get_previous_block(self):

        return self.chain[-1]

    def add_block(
        self,
        action,
        fullname,
        email,
        role,
        filename="",
        sha256="",
        status="Success",
        ip_address=""
    ):

        previous_block = self.get_previous_block()

        block = {
            "index": len(self.chain) + 1,

            "timestamp": str(datetime.now()),

            "action": action,

            "user": {
                "fullname": fullname,
                "email": email,
                "role": role
            },

            "document": {
                "filename": filename,
                "sha256": sha256
            },

            "status": status,

            "ip_address": ip_address,

            "previous_hash": previous_block["current_hash"]
        }

        block["current_hash"] = self.calculate_hash(block)

        self.chain.append(block)

        return block

    def get_chain(self):

        return self.chain


blockchain = Blockchain()