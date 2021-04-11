export class SkillInfo{
    private static xiayanSkillRss = ["广角镜头", "袋装无花果干", "多用军刀", "分装药盒", "智能眼镜", "外文诗集"]
    private static zuoranSkillRss = ["钢笔", "平板电脑", "领带夹", "蓝宝石袖扣", "手枪模型", "高级律师徽章"]
    private static moyiSkillRss = ["黑胶唱片", "木柄花铲", "录音笔", "怀表", "烫金扑克牌", "陶艺茶杯"]
    private static lujingheSkillRss = ["油画工具", "积木零件", "压感笔", "蓝牙耳机", "耳钉", "权限秘钥"]

    static getSkillRssGroup(name:string): string[]{
        switch(name){
            case "夏彦":
              return this.xiayanSkillRss;
            case "左然":
                return this.zuoranSkillRss;
            case "莫弈": 
                return this.moyiSkillRss;
            case "陆景和": 
                return this.lujingheSkillRss;
        }
    }
}

export class CardInfo{
    private static rSkillPowerUp = 95
    private static mrSkillPowerUp = 120
    private static srSkillPowerUp = 119
    private static ssrSkillPowerUp = 159

    private static rStarPowerUp = 113.25
    private static mrStarPowerUp = 234.25
    private static srStarPowerUp = 240.75
    private static ssrStarPowerUp = 318

    private static rMaxPower = 1741
    private static mrMaxPower = 3248
    private static srMaxPower = 3092
    private static ssrMaxPower = 4134

    static calculatePower(rarity:string, star: number, skills: number[]){
        let p = 0;
        switch(rarity){
            case "R":
                p = this.rMaxPower;
                for(let i of skills){
                    let s = i - 1;
                    p += s * this.rSkillPowerUp;
                }
                p += this.rStarPowerUp * (star - 1)
                break;
            case "MR":
                p = this.mrMaxPower;
                for(let i of skills){
                    let s = i - 1;
                    p += s * this.mrSkillPowerUp;
                }
                p += this.mrStarPowerUp * (star - 1)
                break;
            case "SR":
                p = this.srMaxPower;
                for(let i of skills){
                    let s = i - 1;
                    p += s * this.srSkillPowerUp;
                }
                p += this.srStarPowerUp * (star - 1)
                break;
            case "SSR":
                p = this.ssrMaxPower;
                for(let i of skills){
                    let s = i - 1;
                    p += s * this.ssrSkillPowerUp;
                }
                p += this.ssrStarPowerUp * (star - 1)
                break;
        }
        return Math.round(p);
    }

}