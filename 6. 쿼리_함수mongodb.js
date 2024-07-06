// 6. 기본 쿼리 함수 포함

show collections

db.KOPO_PRODUCT_VOLUME.find()

// 테이블 복사
db.KOPO_PRODUCT_VOLUME.aggregate(
    {$match:{}},
    {$out:"KOPO_PRODUCT_VOLUME2"}
)

// 테이블 컬럼 추가 (컬럼간 데이터 곱하기)
db.KOPO_PRODUCT_VOLUME.aggregate([
    {
      $addFields: {
        NEW_COL: { $multiply: ["$VOLUME", 1.2] }
      }
    }
  ]);

// 필드 추가 (데이터 더하기)
db.KOPO_PRODUCT_VOLUME.aggregate([
    {
      $addFields: {
        NEW_COL: { $add: ["$VOLUME", 1000] }
      }
    },
    {$out:"KOPO_PRODUCT_VOLUME3"}
  ]);

db.KOPO_PRODUCT_VOLUME.find()

// 필드추가 (concat REGIONID+"_"+PRODUCTGROUP)
db.KOPO_PRODUCT_VOLUME.aggregate([
    {
     $addFields:{
       NEW_COL3: { $concat: ["$REGIONID", "_", "$PRODUCTGROUP"]}
    }
   }
 ]);

 // 필드추가 (concat REGIONID+"_"+PRODUCTGROUP)
db.KOPO_PRODUCT_VOLUME.aggregate([
    {
     $addFields:{
       NEW_COL3: { $concat: ["$REGIONID", "_", "$PRODUCTGROUP"]}
    }
   }
 ]);

// 필드추가 (toLower : REGIONID)
 db.KOPO_PRODUCT_VOLUME.aggregate([
    {
     $addFields:{
       NEW_COL: { $toLower: ["$REGIONID"]}
    }
   }
 ]);

 // 필드추가 (substr : PRODUCTGROUP)
 db.KOPO_PRODUCT_VOLUME.aggregate([
    {
     $addFields:{
       NEW_COL3: { $substr: ["$PRODUCTGROUP",3,3] }
    }
   }
 ]);
 
 
 
  
  