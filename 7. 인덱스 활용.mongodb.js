// 7. 인덱스 활용

// 인덱스 생성
db.KOPO_PRODUCT_VOLUME.createIndex( { YEARWEEK: 1, QTY: 1} )

// 인덱스 확인
db.KOPO_PRODUCT_VOLUME.getIndexes()

// 인덱스 제거
db.KOPO_PRODUCT_VOLUME.dropIndex( "YEARWEEK_1_QTY_1" )

db.KOPO_PRODUCT_VOLUME.dropIndex( { YEARWEEK: 1, QTY: 1} )


// 삽입할 데이터 생성 함수
function generateRandomData() {
    var data = [];
    for (var i = 0; i < 100000; i++) {
        var randomValue = Math.floor(Math.random() * 1000); // 임의의 숫자 생성
        data.push({
            "value": randomValue
        });
    }
    return data;
}

// 데이터 삽입
var bulkData = generateRandomData();
db.nestCollect.insertMany(bulkData);

// 인덱스 없이 쿼리 실행
var startTime = new Date();
db.nestCollect.find({ "value": { $eq: 4000 } }).explain("executionStats");
var endTime = new Date();
print("인덱스 생성 전 쿼리 실행 시간: " + (endTime - startTime) + "ms");

// 인덱스 생성
db.nestCollect.createIndex({ "value": 1 });

// 인덱스 생성 후 쿼리 실행
var startTimeIndexed = new Date();
db.nestCollect.find({ "value": { $eq: 4000 } }).explain("executionStats");
var endTimeIndexed = new Date();
print("인덱스 생성 후 쿼리 실행 시간: " + (endTimeIndexed - startTimeIndexed) + "ms");