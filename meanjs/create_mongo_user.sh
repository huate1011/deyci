 mongo -u "root" -p "example" -authenticationDatabase "admin"
use mean;
db.createUser({user: "mean" , pwd: "miaologic", roles: [{role: "readWrite", db:"mean"}, {role: "readWrite", db: "mean_dev"}]})
use mean_dev;
db.createUser({user: "mean" , pwd: "miaologic", roles: [{role: "readWrite", db:"mean"}, {role: "readWrite", db: "mean_dev"}]})
