Пример конфига
default.json
{
"Pages": {
"maxRowList": 3
},
"PostgREST": {
"url": "http://127.0.0.1:3030"
},
"LDAP": {
"hostname": "http://127.0.0.1:3030",
"user": "cn=LDAP,cn=Users,dc=xxxx,dc=xxx",
"password": "TfFn7MpasswordfTlL",
"basedn": "ou=Users,dc=xxxx,dc=xxx",
"usernamefield": "sAMAccountName",
"namefield": "cn"
}
}

"maxRowList": 3 - Количество записей на странице

// "LDAP": {
// "hostname": AD server name
// "user": "cn=LDAP,cn=Users,dc=xxxx,dc=xx", //имя пользователя для подключения к Active Directory
// "password": "password",
// "basedn": "ou=Users,dc=xxxx,dc=xxx", //корень просмотра
// "usernamefield": "sAMAccountName", //атрибут,используемый как имя пользователя
// "namefield": "cn" //атрибут, используемый как отображемое имя
// }
