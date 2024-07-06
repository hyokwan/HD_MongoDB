// 5. 기본 쿼리 명령어#1
// 데이터베이스 생성 또는 조회
use hkcodedb

db.selloutcollect.drop()
db.createCollection("selloutcollect")

// 컬렉션 조회
show collections 

// 컬렉션 내 데이터 조회
db.selloutcollect.find(
    {}
)

// 데이터 삽입
record = {"regionid"        : "a01",
    "productgroup" : "st0001",
    "yearweek"       : "202401",
    "qty":1000 }
db.selloutcollect.insertOne(record)

// 데이터 다중 삽입
records = 
[             
    {"regionid":"a01",            
    "productgroup":"st0001",            
    "yearweek":"202402",
    "qty": 1200,         
    "volume":1500 },            
    {"regionid":"a01",            
    "productgroup":"st0002",            
    "yearweek":"202401",            
    "volume":200},
    {"productgroup":"st0003"}      
]
db.selloutcollect.insertMany(records)

// 데이터 조회 (기본)
db.selloutcollect.findOne()
db.selloutcollect.find()

// 데이터 조회 (컬럼 명시)
db.selloutcollect.find(  
    {},
    {"productgroup":1,
      "yearweek":1,
      "_id":0}
   )


// 참고 신규컬럼 생성   
db.selloutcollect.aggregate([
    {
        $addFields: {
            idx: {
                $concat: ["$regionid", "_", "$productgroup"]
            }
        }
    }
])

db.selloutcollect.aggregate([
    {
        $addFields: {
            idx: {
                $concat: ["$regionid", "_", "$productgroup"]
            }
        }
    },
    {
    $project: {
        idx: 1,
        productgroup: 1,
        yearweek: 1,
        _id: 0 // _id 필드를 명시적으로 제외할 수 있습니다
    }
}
])


// 쿼리 생성
db.selloutcollect.aggregate([
    {
        $addFields: {
            idx: {
                $concat: ["$regionid", "_", "$productgroup"]
            }
        }
    },
    {
        $merge: {
            into: "selloutcollect_with_idx", // 새로운 컬렉션 이름
            on: "_id", // 기존 문서와 병합할 필드
            whenMatched: "merge", // 기존 문서와 일치할 때 병합 전략
            whenNotMatched: "insert" // 새로운 문서일 때 삽입 전략
        }
    }
])

// 4. 다큐먼트 조회 [비교 연산자]
// 특정 조건 데이터 조회 (where productgroup in ('st0002','st0003'))
targetProduct = ["st0002","st0003"]
db.selloutcollect.find( {"productgroup":
                                    {"$in":targetProduct}    
                                });

stdValue = 1000
db.selloutcollect.find( {"qty":
                                    {"$gt" : stdValue }  
                        });
                                
targetProduct = "st0001"
db.selloutcollect.find( {"productgroup":
                                    {"$eq": targetProduct}    
});
                        
// 5. 다큐먼트 조회 [논리 연산자]

db.selloutcollect.find(
    {$nor:
        [ {"productgroup":"st0001"},
          {"qty": {$gt: 1000}}
        ]
    })

use hkcodedb

show collections

db.cscollect.find()



