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
let arrPost = [];
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
                    client.db(dbName).collection("discover").find().toArray()
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
        else if (url.slice(0, 15) == "/api/postsFirst") {
            // console.log(shuffleArray(Number(url.slice(13)), Number(url.slice(13)) + 10));
            // { id: { $gte: Number(url.slice(13)), $lt: Number(url.slice(13)) + 10 } }
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("user").find().toArray()
                        .then(result => {
                            arrPost = [];
                            result.forEach(element => {
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

                            const array = shuffleArray(1, arrPost.length);
                            arrPost = array.map(element => {
                                // return arrPost.find(ele => ele.id === element);
                                return arrPost[element - 1];
                            });
                            let arrPostNew = [];
                            for (let index = Number(url.slice(18)) * 10 - 10; index <= Number(url.slice(18)) * 10 - 1; index++) {
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
        else if (url.slice(0, 10) == "/api/posts") {
            let arrPostNew = [];
            for (let index = Number(url.slice(13)) * 10 - 10; index <= Number(url.slice(13)) * 10 - 1; index++) {
                if (typeof arrPost[index] === 'object' && arrPost[index] !== null) {
                    arrPostNew[arrPostNew.length] = arrPost[index];
                    continue;
                }
                continue;
            }
            kq = JSON.stringify(arrPostNew);
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(kq);
        }
        else if (url.slice(0, 11) == "/api/recAcc") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("user").find().limit(30).toArray()
                        .then(result => {
                            result = result.map(ele => {
                                delete ele.post;
                                delete ele.following;
                                ele.follow = ele.followers;
                                ele.like = ele.likes;
                                delete ele.followers;
                                delete ele.likes;
                                return ele;
                            })
                            kq = JSON.stringify(result);
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
        else if (url.slice(0, 15) == "/api/userSearch") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("user").find().toArray()
                        .then(result => {
                            result = result.map(ele => {
                                delete ele.post;
                                delete ele.id;
                                delete ele.following;
                                delete ele.followers;
                                delete ele.likes;
                                delete ele._id;
                                return ele;
                            })
                            let newResult = [];
                            let count = 0;
                            for (let index = 0; index < result.length; index++) {
                                if (result[index].name.toLowerCase().includes(url.slice(18).toLowerCase())) {
                                    newResult[newResult.length] = result[index];
                                    count++;
                                    if (count == 5) {
                                        break;
                                    }
                                    continue;
                                }
                                continue;
                            }
                            kq = JSON.stringify(newResult);
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
        else if (url.slice(0, 9) == "/api/user") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("user").find().toArray()
                        .then(result => {
                            result = result.map(ele => {
                                if (ele.hasOwnProperty("post")) {
                                    ele.posts = ele.post;
                                    delete ele.post;
                                    delete ele._id;
                                    ele.posts.forEach(post => {
                                        delete post.music;
                                        delete post.userLike;
                                        delete post.userComment;
                                        delete post.userShare;
                                    })
                                    return ele;
                                }
                            })
                            result = result.find(ele => ele.name === url.slice(12))
                            kq = JSON.stringify(result);
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
    }
})
// Dịch vụ lắng nghe tại cổng nào
dichvu.listen(port, () => {
    console.log(`Server Run.. http://localhost:${port}`)
})
