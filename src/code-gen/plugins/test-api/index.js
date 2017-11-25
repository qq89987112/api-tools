let request = require('supertest');

module.exports = (app)=>{

    return ()=>{
        let apis = app.$data
        apis.forEach((item)=>{
            let
                apiConfigs = item.value;

                apiConfigs.forEach((item)=>{
                    request(item.url)
                        .post('/login')
                        .send(profile)
                        .expect('Content-Type', /json/)
                        .expect(200) //Status code
                        .end(function(err,res) {
                            if (err) {
                                throw err;
                            }
                            console.log("success res==>",res.body);
                            // Should.js fluent syntax applied
                            res.body.status.should.equal(0);
                            userCookie = res.headers['set-cookie'];
                            done();
                        });
                })

        });

    }

};
