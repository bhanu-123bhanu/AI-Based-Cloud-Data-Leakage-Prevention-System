from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

# 32-byte AES Key
SECRET_KEY = b"12345678901234567890123456789012"


def encrypt_file(file_path):

    cipher = AES.new(SECRET_KEY, AES.MODE_CBC)

    with open(file_path, "rb") as file:
        data = file.read()

    encrypted_data = cipher.encrypt(
        pad(data, AES.block_size)
    )

    encrypted_path = file_path + ".enc"

    with open(encrypted_path, "wb") as file:
        file.write(cipher.iv)
        file.write(encrypted_data)

    return encrypted_path


def decrypt_file(encrypted_path):

    with open(encrypted_path, "rb") as file:
        iv = file.read(16)
        encrypted_data = file.read()

    cipher = AES.new(
        SECRET_KEY,
        AES.MODE_CBC,
        iv
    )

    decrypted_data = unpad(
        cipher.decrypt(encrypted_data),
        AES.block_size
    )

    decrypted_path = encrypted_path.replace(".enc", "_decrypted.pdf")

    with open(decrypted_path, "wb") as file:
        file.write(decrypted_data)

    return decrypted_path