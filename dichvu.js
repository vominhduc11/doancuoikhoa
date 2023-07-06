// Khai báo thư viện http
const http = require("http");
// Khai báo thư viện xử lý tập tin
// const fs = require("fs");
// const nodemailer = require('nodemailer');
// const imgCloud = require("")
// Khai báo cổng
const port = process.env.PORT || 8001;
// MongoDB
const mongo_db = require("mongodb");
// const sendMail = require("./sendMail");
const MongoClient = mongo_db.MongoClient;
const dbName = 'js279';
const uri = `mongodb+srv://hv:vominhduc123@cluster0.zssl6ez.mongodb.net/test`;
let arrPost = [];
let count = 0;
function shuffleArray(s, e) {
    const array = []
    for (let index = s; index <= e; index++) {
        array[index - s] = index;
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Xây dựng Service
const dichvu = http.createServer((req, res) => {
    let method = req.method;
    let url = req.url;
    let kq = `Server NodeJS - Method:${method} - Url:${url}`;

    // Cấp quyền
    res.setHeader("Access-Control-Allow-Origin", '*');
    if (method == "GET") {
        if (url == "/api/discover") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("discover").find().limit(10).toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else if (url.slice(0, 10) == "/api/posts" && count === 0) {
            count++;
            // console.log(shuffleArray(Number(url.slice(13)), Number(url.slice(13)) + 10));
            // { id: { $gte: Number(url.slice(13)), $lt: Number(url.slice(13)) + 10 } }
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("user").find().toArray()
                        .then(result => {

                            // const array = shuffleArray(Number(url.slice(13)), Number(url.slice(13)) + 9);
                            const array = shuffleArray(1, result.length);
                            let array1 = array.map(element => {
                                return result.find(ele => ele.id === element);
                            });
                            array1 = array1.forEach(element => {
                                if (element.hasOwnProperty("post")) {
                                    element.post.forEach(ele => {
                                        ele = {
                                            id: element.id,
                                            avatar: element.avatar,
                                            name: element.name,
                                            nickname: element.nickname,
                                            followers: element.followers,
                                            likes: element.likes,
                                            ...ele
                                        }
                                        arrPost[arrPost.length] = ele;
                                    })
                                }
                            });


                            // arrPost = arrPost.map((element, index) => {
                            //     // if (element.id >= Number(url.slice(13)) * 10 - 9 && element.id < Number(url.slice(13)) + 10) {
                            //     //     return element;
                            //     // }
                            //     if (typeof element === 'object' && element !== null && (index + 1) >= Number(url.slice(13)) * 10 - 9 && (index + 1) <= Number(url.slice(13)) * 10) {
                            //         return element;
                            //     }
                            //     return "abc";
                            // });
                            let arrPostNew = [];
                            for (let index = Number(url.slice(13)) * 10 - 10; index <= Number(url.slice(13)) * 10 - 1; index++) {
                                if (typeof arrPost[index] === 'object' && arrPost[index] !== null) {
                                    arrPostNew[arrPostNew.length] = arrPost[index];
                                    continue;
                                }
                                continue;
                            }
                            kq = JSON.stringify(arrPostNew);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })

        }
        else if (url.slice(0, 10) == "/api/posts" && count !== 0) {
            let arrPostNew = [];
            for (let index = Number(url.slice(13)) * 10 - 10; index <= Number(url.slice(13)) * 10 - 1; index++) {
                if (typeof arrPost[index] === 'object' && arrPost[index] !== null) {
                    arrPostNew[arrPostNew.length] = arrPost[index];
                    continue;
                }
                continue;
            }
            kq = JSON.stringify(arrPostNew);
            // client.close();
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(kq);
        }
    }
})
// Dịch vụ lắng nghe tại cổng nào
dichvu.listen(port, () => {
    console.log(`Server Run.. http://localhost:${port}`)
})


