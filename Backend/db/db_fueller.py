import random
import sqlite3

l_names = ["Mueller", "Schmidt", "Butzke", "Madlener", "Duck", "Mouse", "Schmitt", "Sommer", "Winter", "Fruehling", "Herbst"]
f_names = ["Max", "Markus", "Mila", "Sebastian", "Silas", "Moritz", "Anke", "Jutta", "Frauke", "Engelbert", "Otto", "Pascal", "Marcel"]
adjectives = ["witzig", "traurig", "lustig", "groß", "klein", "schnell", "langsam", "dick", "duenn", "hoch", "niedrig"]
modifier = ["sehr", "nicht", "bisschen", "weng", "etwas", "halb", "unfassbar", "mega", "kaum", "marginal"]
messages = ["Hey", "Hallo", "Wie gehts?", "Was geht ab?", "Guten Morgen!", "foo", "bar", "foobar", "barfoo"]
key_public_hashes = ["pubkey_41e4649b93", "pubkey_9345dbd3kd"]
key_private_hashes = ["privkey_41e4649b93", "privkey_9345dbd3kd"]
password_hashes = ["pwd_41e4649b93", "pwd_9345dbd3kd"]
key_sym_hashes = ["sym_41e4649b93", "sym_9345dbd3kd"]

# DB connection
con = sqlite3.connect("./SicherInAlbstadt.sqlite3")
cur = con.cursor()

# fill DB with random stuff
for i in range(1000):
	username = "".join(random.choices("abcdefghijklmnopqrstuvwxyz", k=6))
	password = random.choice(password_hashes)
	key_public = random.choice(key_public_hashes)
	key_private = random.choice(key_private_hashes)

	message_id = "".join(random.choices("123456789", k=6))
	text = random.choice(messages)
	sender_id = random.randint(1000, 9999)
	receiver_id = random.randint(1000, 9999)
	sym_key_sender = random.choice(key_sym_hashes)
	sym_key_receiver = random.choice(key_sym_hashes)
	flag_seen = random.randint(0, 1)

	cur.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?)", (username, password, key_public, key_private))
	cur.execute("INSERT INTO messages VALUES (?, ?, ?, ?, ?, ?, ?)", (message_id, text, sender_id, receiver_id, sym_key_sender, sym_key_receiver, flag_seen))

# write data to DB
con.commit()

# close connection
con.close()
