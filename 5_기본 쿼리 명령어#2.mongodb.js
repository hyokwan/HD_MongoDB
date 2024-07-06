// 5. 기본 쿼리 명령어 #2

records = [ 
    {"regionid":"a01","productgroup":"st0001","yearweek":"202401",
    "sales": {"sellin":100,
              "sellout":80}},
    {"regionid":"a01", "productgroup":"st0002","yearweek":"202401",
    "sales": {"sellin":1200,
              "sellout":1150}},
    {"regionid":"a01", "productgroup":"st0002", "yearweek":"202402",
    "sales": {"sellin":1500,
             "sellout":1400}} ]
db.nestCollect.insertMany(records)


// 아래와 같은 구조로 cscollect_hk 이름의
// 컬렉션을 생성해보세요
records = [ 
    {"custid":"A1356","avgprice":"4230","devcount":"3",
    "base": {"age":32,
              "gender":"male"}},
    {"custid":"A1421","avgprice":"5000","devcount":"2",
    "base": {"age":42,
              "gender":"female"}},
    {"custid":"A1660","avgprice":"2000","devcount":"5",
    "base": {"age":35}} ]
db.cscollect_hk.insertMany(records)


// 특정 조건 데이터 조회
targetSales = 0;
db.nestCollect.find( 
    {"sales.sellin" : {$gt : targetSales}}
)

// 쿼리를 활용하여 202401주차에
// sellin이 1000 보다 큰 데이터를 조회하세요.
targetSales = 1000;
db.nestCollect.find({$and:
    [
        {"sales.sellin" : {$gt : targetSales}},
        {"yearweek":"202401"}
    ]}
)


// 업데이트

db.nestCollect.updateOne(
    { "productgroup": "st0001" },
    { $set: { "sales.sellin": 1000, "sales.sellout": 2000 } }
)

db.nestCollect.updateMany(
    { "productgroup": "st0002" },
    { $set: { "sales.sellin": 9999, "sales.sellout": 1111 } }
)

db.nestCollect.find()

db.nestCollect.updateOne({"productgroup":"st0001"},
    {"$set":  {"sellin":1000,"sellout":2000}}
  )

db.nestCollect.updateMany(
    {},
    {"$unset": {"sales.sellin": "", "sales.sellout": ""}}
)

// 다날라감
db.nestCollect.updateMany(
    {},
    {"$unset": {"sales": ""}}
)

                              

