```plantuml
@startuml
left to right direction
actor "ユーザー" as user
actor "管理者" as admin
actor "スタッフ" as staff
rectangle サイト {
    rectangle ドラマ {
        usecase (50音順のドラマ一覧を見る) as showDramaList
        usecase (ドラマを追加する) as addDrama
        usecase (ドラマのレビューを見る) as showDramaReview
        usecase (ドラマのレビューを投稿する) as postDramaReview
        rectangle キャスト {
            usecase (キャストを評価を見る) as showCastReputation
            usecase (キャストを追加する) as addCast
            usecase (キャストの評価を投稿する) as addCastReputation
        }
    }
    rectangle 役者 {
        usecase (50音順の役者一覧を見る) as showActorList
        usecase (役者の評価一覧を見る) as showActorReputationList
        usecase (役者を追加する) as addActor
    }
}
キャスト -- 役者
キャスト -- ドラマ
admin --|> user
staff --|> user
user -- showDramaReview
user -- postDramaReview
user -- showCastReputation
user -- addCastReputation
user -- showDramaList
user -- showActorList
user -- showActorReputationList
admin -- addDrama
admin -- addCast
admin -- addActor
```