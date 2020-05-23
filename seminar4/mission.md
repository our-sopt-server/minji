User Table
| Idx | name | id | password |
|------|------|------|------|
|1 | 김민지 | kimminji | alswl |
|2| 황지혜 | hwang | wlgP |
|3| 허정민 | hu | wjdals |

Article Table
|Idx| 사용자Idx | author | title | content |
|------|------|------|------|------|
| 1 | 1 |김민지| 민지의 쿡방 | 김치찌개 만드는 법 |
| 1 | 3 |허정민| 정민의 쿡방 | 간장비빔국수 만드는 법 |  

Like Table
| Idx | 사용자Idx | 게시글Idx| like |
|------|------|------|------|
| 1 | 1 | 2 | true |
| 2 | 2 | 2 | false |

Comment Table
| Idx | 사용자Idx | 게시글Idx| comment |
|------|------|------|------|
| 1 | 1 | 2 | 맛있겠네요~ |
| 1 | 3 | 2 | 좋아요~ |