##
## Run the following command to convert XML from ../data/cache/epub/ to JSON.
##

node rdf-to-bulk.js ../data/cache/epub/ > ../data/bulk_pg.ldj

##
## Insert previous JSON documents from bulk_pg.ldj into ElasticSearch database.
##

curl -X POST 
     -H "Content-Type: application/json" 
     --data-binary "@bulk_pg.json" 
     http://localhost:9200/books/book/_bulk`