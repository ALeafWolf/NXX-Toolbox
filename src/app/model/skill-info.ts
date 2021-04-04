export class SkillInfo{
    static xiayanSkillRss = ["广角镜头", "袋装无花果干", "多用军刀", "分装药盒", "智能眼镜", "外文诗集"]
    static zuoranSkillRss = ["钢笔", "平板电脑", "领带夹", "蓝宝石袖扣", "手枪模型", "高级律师徽章"]
    static moyiSkillRss = ["黑胶唱片", "木柄花铲", "录音笔", "怀表", "烫金扑克牌", "陶艺茶杯"]
    static lujingheSkillRss = ["油画工具", "积木零件", "压感笔", "蓝牙耳机", "耳钉", "权限秘钥"]

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