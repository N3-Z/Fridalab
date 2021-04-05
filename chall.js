

//must must be reloaded in order to run the function
Java.perform(function(){
    console.log("=====Start=====")
    var pkg = "uk.rossmarks.fridalab."
    var mainIntance

    // chall01
    let functionName = pkg+"challenge_01"
    var chal = Java.use(functionName)
    chal.chall01.value = 1
    
    //chall02
    Java.choose(pkg+"MainActivity",{
        // if function not running, set frida %reload
        onMatch: function(instance){
            console.log("success chall02")
            instance.chall02()
            mainIntance = instance
        },
        onComplete: function(){}
    })

    //chall03
    let chall = Java.use(pkg+"MainActivity")
    chall.chall03.implementation = function(){
        console.log("success chall03")
        return true
    }
    
    //chall04
    // ======================================
    if(mainIntance) mainIntance.chall04("frida")
    
    // or

    // Java.choose(pkg+"MainActivity",{
    //     // if function not running, set frida %reload
    //     onMatch: function(instance){
    //         console.log("success chall04")
    //         instance.chall04("frida")
    //     },
    //     onComplete: function(){}
    // })
    // ======================================

    
    //chall05
    chall.chall05.overload("java.lang.String").implementation = function(x){
        console.log("Success chall05")
        let str = this.chall05("frida") //to recall chall05 again with "frida" parameter
        return str
    }

    //chall06
    let challange06 = Java.use(pkg+"challenge_06")
    challange06.confirmChall06.implementation = function(x){
        console.log("Success Challange06")
        return true
    }

    // ======================================
    if(mainIntance) mainIntance.chall06(1337)
    
    // or

    // Java.choose(pkg+"MainActivity", {
    //     onMatch: function(i){
    //         console.log("Success Chall06")
    //         i.chall06(1337)
    //     },
    //     onComplete: function(){}
    // })

    // ======================================


    //chall07
    let chall07 = Java.use(pkg + "challenge_07")
    chall07.check07Pin.overload("java.lang.String").implementation = function(x){
        for(let i = 1000; i <= 9999; i++){
            let res = this.check07Pin(i+"")
            if(res){
                return res
            }
        }
    }
    // ======================================
    if(mainIntance) mainIntance.chall07("hahaha")

    // or

    // Java.choose(p+"MainActivity",{
    //     onMatch:function(i){
    //         i.chall07("hahaha")
    //     },
    //     onComplete: function(){}
    // })
    // ======================================

    
    //chall08
    if(mainIntance){
        let str_ = Java.use("java.lang.String")
        let btn = Java.use("android.widget.Button")
        let btn_id = mainIntance.findViewById(2131165231)
        let checkbtn = Java.cast(btn_id, btn)
        checkbtn.setText(str_.$new("Confirm"))
        console.log("success chall08")
    }


    console.log("=====Finish=====")
})

