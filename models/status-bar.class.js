class Statusbar extends DrawableObject{
    width = 150
    height= 45

    setPercentage(percentage){
        if(percentage >= 100) percentage = 100
        this.percentage = percentage;
        let path = this.IMAGE[this.resolveImageIndex()]
        this.img = this.imageChache[path];
    }
        resolveImageIndex(){
        if(this.percentage == 100){
            return 5
        }else if (this.percentage >= 80){
            return 4
        }
        else if (this.percentage >= 60){
            return 3
        }
        else if (this.percentage >= 40){
            return 2
        }
        else if (this.percentage >= 20){
            return 1
        }
        else{
            return 0
        }
    }
}
