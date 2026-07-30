from utils.encryption import encrypt_file, decrypt_file

# Replace this with your PDF file name
file_path = "uploads/Resume.pdf"

print("Original File:")
print(file_path)

# Encrypt the file
encrypted_file = encrypt_file(file_path)
print("\nEncrypted File Created:")
print(encrypted_file)

# Decrypt the file
decrypted_file = decrypt_file(encrypted_file)
print("\nDecrypted File Created:")
print(decrypted_file)

print("\nAES Encryption Test Successful ✅")