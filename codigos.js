const Step = {
    init:function(data){
        const {step1,step2} = data
        this.step1 = document.querySelector(step1)
        this.step2 = document.querySelector(step2)
    },
    screen :function(id) {
        this.children = document.getElementById(id)
    },
    begin:function(){
        this.step1.classList.add('mostrar');
    },
    next : function() {
        this.step1.classList.remove('mostrar');
        this.step2.classList.add('mostrar');
    },
    back : function() {
        changeView({hide:'frmPlanesSOR',show:'frmPlans'})
        btnBackHome.style.display = 'none'
        this.step2.classList.remove('mostrar');
        if(dataInsuredSend.tipoplan == 'familiar'){
            changeView({hide:'formInsured',show:'formHome'})
            document.querySelector('.detail_insured').style.display = 'none'
        }
        this.step1.classList.add('mostrar');
    }
}