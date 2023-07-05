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
        else if (url.slice(0, 10) == "/api/posts") {
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
                            let arrPost = [];
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


                            arrPost = arrPost.map(element => {
                                if (element.id >= Number(url.slice(13)) * 10 - 9 && element.id < Number(url.slice(13)) + 10) {
                                    return element;
                                }
                            })
                            kq = JSON.stringify(arrPost);
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
        else if (url == "/dsHocsinh") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("dsHocsinh").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/dsTivi") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Tivi").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq);
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/dsDienthoai") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Dien_thoai").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/dsMathang") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Mat_hang").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/dsNguoidung") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Nguoi_dung").find().toArray()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        }).catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log(err)
                })
        }
        else if (url == "/Cuahang") {
            MongoClient.connect(uri)
                .then(client => {
                    client.db(dbName).collection("Cua_hang").findOne()
                        .then(result => {
                            kq = JSON.stringify(result);
                            client.close();
                            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                            res.end(kq)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log(err)
                })
        }
        else if (url.match("\.png$")) {
            let imagePath = `images/${url}`;
            if (!fs.existsSync(imagePath)) {
                imagePath = `images/noImage.png`;
            }
            let fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, { "Content-Type": "image/png" });
            fileStream.pipe(res);
        }
        else {
            kq = `Không tìm thấy ${url}`
            res.end(kq)
        }
    }
    else if (method == "POST") {
        let noi_dung_nhan = ``;
        // Nhận thông tin gởi gán vào biến noi_dung_nhan
        req.on("data", (data) => {
            noi_dung_nhan += data;
            console.log(noi_dung_nhan)
        })
        // Xử lý thông tin nhận và trả kết quả lại cho client
        if (url == "/ThemUser") {
            req.on("end", () => {
                let kq = noi_dung_nhan;
                res.end(kq);
            })
        }
        else if (url == "/Dangnhap") {
            req.on("end", () => {
                let kq = {
                    noi_dung: true
                };
                let user = JSON.parse(noi_dung_nhan);
                MongoClient.connect(uri)
                    .then(client => {
                        client.db(dbName).collection("Admin").find().toArray()
                            .then(result => {
                                // arr = result;
                                // arr = JSON.parse(strJSON);
                                console.log(result)
                                let vt = result.findIndex(item => item.Ten_Dang_nhap == user.Ten_Dang_nhap && item.Mat_khau == user.Mat_khau);
                                if (vt == -1) {
                                    kq.noi_dung = false
                                }
                                res.end(JSON.stringify(kq));
                                client.close();
                                // res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                                // res.end(kq)
                            }).catch(err => {
                                console.log(err)
                            })
                    }).catch(err => {
                        console.log(err)
                    })
                // Read File Nguoi_dung
                // let strJSON = fs.readFileSync("./dulieu/Nguoi_dung.json");

            })
        }
        else if (url == "/sendMail") {
            // console.log(1)
            req.on("end", function () {
                let thongTin = JSON.parse(noi_dung_nhan);
                let Ket_qua = { "Noi_dung": true };
                let from = `ducvominh706@gmail.com`;
                let to = `${thongTin.email}`;
                let subject = "Cửa hàng thu trân";
                let body = thongTin.body
                sendMail.Goi_Thu_Lien_he(from, to, subject, body).then(result => {
                    // console.log(result);
                    res.end(JSON.stringify(Ket_qua));
                }).catch(err => {
                    // console.log(err);
                    Ket_qua.Noi_dung = false;
                    res.end(JSON.stringify(Ket_qua));
                })
            })
        } else if (url == "/contact") {
            req.on("end", function () {
                let thongTin = JSON.parse(noi_dung_nhan);
                let Ket_qua = { "Noi_dung": true };
                let from = "";
                let to = `ducvominh706@gmail.com`;
                let subject = thongTin.email + "-" + thongTin.title;
                let body = `<h1>${thongTin.name}</h1>` + '<br>' + thongTin.body
                sendMail.Goi_Thu_Lien_he(from, to, subject, body).then(result => {
                    // console.log(result);
                    res.end(JSON.stringify(Ket_qua));
                }).catch(err => {
                    // console.log(err);
                    Ket_qua.Noi_dung = false;
                    res.end(JSON.stringify(Ket_qua));
                })
            })
        } else if (url == "/ThemSanPham") {
            req.on("end", () => {
                let kq = {
                    Noi_dung: true
                };
                let data = JSON.parse(noi_dung_nhan);
                const key = data.group;
                if (key === "Nhom_Dien_thoai") {
                    var obj = {
                        Ten: data.Ten,
                        Ma_so: data.Ma_so,
                        Don_gia_Ban: data.Don_gia_Ban,
                        Don_gia_Nhap: data.Don_gia_Nhap,
                        Nhom_Dien_thoai: {
                            Ten: data[key].Ten,
                            Ma_so: data[key].Ma_so
                        },
                        Danh_sach_Phieu_Dat: [],
                        Danh_sach_Phieu_Ban: [],
                        Danh_sach_Phieu_Nhap: [],
                    }
                } else if (key === "Nhom_Tivi") {
                    var obj = {
                        Ten: data.Ten,
                        Ma_so: data.Ma_so,
                        Don_gia_Ban: data.Don_gia_Ban,
                        Don_gia_Nhap: data.Don_gia_Nhap,
                        Nhom_Tivi: {
                            Ten: data[key].Ten,
                            Ma_so: data[key].Ma_so
                        },
                        Danh_sach_Phieu_Dat: [],
                        Danh_sach_Phieu_Ban: [],
                        Danh_sach_Phieu_Nhap: [],
                    }
                } else if (key === "Nhom_Mat_hang") {
                    var obj = {
                        Ten: data.Ten,
                        Ma_so: data.Ma_so,
                        Don_gia_Ban: data.Don_gia_Ban,
                        Don_gia_Nhap: data.Don_gia_Nhap,
                        Nhom_Mat_hang: {
                            Ten: data[key].Ten,
                            Ma_so: data[key].Ma_so
                        },
                        Danh_sach_Phieu_Dat: [],
                        Danh_sach_Phieu_Ban: [],
                        Danh_sach_Phieu_Nhap: [],
                    }
                }

                MongoClient.connect(uri).then(client => {
                    client.db(dbName).collection(data.collection).insertOne(obj).then(result => {
                        // console.log(result)
                        res.end(JSON.stringify(kq))
                        client.close();
                    }).catch(err => {
                        console.log(err);
                        kq.Noi_dung = false;
                        res.end(JSON.stringify(kq));
                    })
                }).catch(err => {
                    console.log(err);
                })
            })
        }
        else if (url == "/ImagesSanpham") {
            req.on('end', function () {
                let img = JSON.parse(noi_dung_nhan);
                let kq = { Noi_dung: true };
                let kqImg = saveMedia(img.name, img.src);
                if (kqImg == "OK") {
                    // res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                    res.end(JSON.stringify(kq));
                } else {
                    kq.Noi_dung = false
                    // res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                    res.end(JSON.stringify(kq));
                }
                // imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                //     console.log(result);
                //     Dap_ung.end(JSON.stringify(Ket_qua));

                // }).catch(err=>{
                //     Ket_qua.Noi_dung=false
                //     Dap_ung.end(JSON.stringify(Ket_qua))
                // })
            })
        }
        else if (url == "/updateProduct") {
            req.on("end", () => {
                let kq = { Noi_dung: true };
                let data = JSON.parse(noi_dung_nhan);
                if (data.group === "Nhom_Tivi") {
                    var mobileUpdate = {
                        condition: {
                            _id: mongo_db.ObjectId(data._id),
                        },
                        update: {
                            $set: {
                                Ten: data.Ten,
                                Ma_so: data.Ma_so_temp,
                                Don_gia_Ban: data.Don_gia_Ban,
                                Don_gia_Nhap: data.Don_gia_Nhap,
                                Nhom_Tivi: {
                                    Ten: data[data.group].Ten,
                                    Ma_so: data[data.group].Ma_so
                                }
                            }
                        }
                    }
                } else if (data.group === "Nhom_Dien_thoai") {
                    var mobileUpdate = {
                        condition: {
                            _id: mongo_db.ObjectId(data._id),
                        },
                        update: {
                            $set: {
                                Ten: data.Ten,
                                Ma_so: data.Ma_so_temp,
                                Don_gia_Ban: data.Don_gia_Ban,
                                Don_gia_Nhap: data.Don_gia_Nhap,
                                Nhom_Dien_thoai: {
                                    Ten: data[data.group].Ten,
                                    Ma_so: data[data.group].Ma_so
                                }
                            }
                        }
                    }
                } else if (data.group === "Nhom_Mat_hang") {
                    var mobileUpdate = {
                        condition: {
                            _id: mongo_db.ObjectId(data._id),
                        },
                        update: {
                            $set: {
                                Ten: data.Ten,
                                Ma_so: data.Ma_so_temp,
                                Don_gia_Ban: data.Don_gia_Ban,
                                Don_gia_Nhap: data.Don_gia_Nhap,
                                Nhom_Mat_hang: {
                                    Ten: data[data.group].Ten,
                                    Ma_so: data[data.group].Ma_so
                                }
                            }
                        }
                    }
                }
                console.log(mobileUpdate)
                MongoClient.connect(uri).then(client => {
                    client.db(dbName).collection(data.collection).updateOne(mobileUpdate.condition, mobileUpdate.update).then(result => {
                        // console.log(result)
                        res.end(JSON.stringify(kq))
                        client.close();
                    }).catch(err => {
                        // console.log(err);
                        kq.Noi_dung = false;
                        res.end(JSON.stringify(kq));
                    })
                }).catch(err => {
                    console.log(err);
                })
            })
        } else if (url == "/removeProduct") {
            req.on("end", () => {
                let kq = { Noi_dung: true };
                let data = JSON.parse(noi_dung_nhan);
                MongoClient.connect(uri).then(client => {
                    client.db(dbName).collection(data.collection).deleteOne({ _id: mongo_db.ObjectId(data._id) }).then(result => {
                        // console.log(result)
                        res.end(JSON.stringify(kq))
                        client.close();
                    }).catch(err => {
                        // console.log(err);
                        kq.Noi_dung = false;
                        res.end(JSON.stringify(kq));
                    })
                }).catch(err => {
                    console.log(err);
                })
            })
        }
        else {
            kq = `Method: ${method} - Chưa xét URL ${url}`
            res.end(kq)
        }
    }
    else {
        res.end(kq);
    }
})

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Error ...');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function saveMedia(Ten, Chuoi_nhi_phan) {
    var Kq = "OK"
    try {
        var Nhi_phan = decodeBase64Image(Chuoi_nhi_phan);
        var Duong_dan = "images//" + Ten + ".png"
        fs.writeFileSync(Duong_dan, Nhi_phan.data);
    } catch (Loi) {
        Kq = Loi.toString();
    }
    return Kq
}
// Dịch vụ lắng nghe tại cổng nào
dichvu.listen(port, () => {
    console.log(`Server Run.. http://localhost:${port}`)
})





