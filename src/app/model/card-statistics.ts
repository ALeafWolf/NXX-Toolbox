export class SkillInfo {
    private static _xiayanSkillRss = ["广角镜头", "袋装无花果干", "多用军刀", "分装药盒", "智能眼镜", "外文诗集"]
    private static _zuoranSkillRss = ["钢笔", "平板电脑", "领带夹", "蓝宝石袖扣", "手枪模型", "高级律师徽章"]
    private static _moyiSkillRss = ["黑胶唱片", "木柄花铲", "录音笔", "怀表", "烫金扑克牌", "陶艺茶杯"]
    private static _lujingheSkillRss = ["油画工具", "积木零件", "压感笔", "蓝牙耳机", "耳钉", "权限秘钥"]

    static getSkillRssGroup(name: string): string[] {
        switch (name) {
            case "夏彦":
                return this._xiayanSkillRss;
            case "左然":
                return this._zuoranSkillRss;
            case "莫弈":
                return this._moyiSkillRss;
            case "陆景和":
                return this._lujingheSkillRss;
        }
    }

    static removePostFix(input: string) {
        let a = "";
        //remove α, β, γ, I, II, III from end of the skill name
        let re = /α*β*γ*\sⅠ*Ⅱ*Ⅲ*/
        a = input.replace(re, "")
        return a;
    }
}

export class CardInfo {
    //升技能战力，单个技能每升一级加一次，最多27次
    private static _rSkillPowerUp = 95
    private static _mrSkillPowerUp = 120
    private static _srSkillPowerUp = 119
    private static _ssrSkillPowerUp = 159

    //升星战力，每升一星加一次，最多4次
    private static _rStarPowerUp = 113.25
    private static _mrStarPowerUp = 234.25
    private static _srStarPowerUp = 240.75
    private static _ssrStarPowerUp = 318

    //基础战力
    private static _rMaxPower = 1741
    private static _mrMaxPower = 3248
    private static _srMaxPower = 3092
    private static _ssrMaxPower = 4134


    static calculatePower(rarity: string, star: number, skills: number[]) {
        let p = 0;
        let pu = 0;
        let spu = 0
        switch (rarity) {
            case "R":
                p = this._rMaxPower;
                pu = this._rSkillPowerUp;
                spu = this._rStarPowerUp;
                break;
            case "MR":
                p = this._mrMaxPower;
                pu = this._mrSkillPowerUp;
                spu = this._mrStarPowerUp;
                break;
            case "SR":
                p = this._srMaxPower;
                pu = this._srSkillPowerUp;
                spu = this._srStarPowerUp;
                break;
            case "SSR":
                p = this._ssrMaxPower;
                pu = this._ssrSkillPowerUp;
                spu = this._ssrStarPowerUp;
                break;
        }
        for (let i of skills) {
            let s = i - 1;
            p += s * pu;
        }
        p += spu * (star - 1)

        return Math.round(p);
    }
}

export class ExpChipInfo {
    private static _expChipValues = [450, 1500, 4500, 15000]
    private static _expChipCost = [45, 150, 450, 1500]
    private static _expChipNames = ["法理之谕 Ⅰ", "法理之谕 Ⅱ", "法理之谕 Ⅲ", "法理之谕 Ⅳ"]

    static getExpChipValues() {
        return this._expChipValues;
    }

    static getExpChipNames(lang: any) {
        console.log(`Chip language: ${lang}`)
        return this._expChipNames;
    }

    static getExpChipCost() {
        return this._expChipCost;
    }
}