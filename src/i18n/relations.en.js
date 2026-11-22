// English overlay for relationship types (RELATIONS[].t). Keys are the atomic types;
// compound types such as 「倾慕·恩义」 are split on 「·」 and joined with " · ".
// These are chip labels (profile 「Relationships」, network and orbit hovers): short, noun-like.
// Rule: a label names the relationship, never a role held by one end. Both cards show the same
// label beside the *other* person's name, and network edges carry no direction at all, so
// "Father" would call the son a father on one of the two cards (生父 程广→程凯). Asymmetric
// types are therefore pair forms ("Father and child", "Guard & charge") or neutral nouns
// ("Tutelage", "Entrustment"); never a bare role ("Father", "Guard") or a participle that
// attaches to the name shown ("Brought into the order"). Mutual roles go in the plural.
// 2026-11-22 T0 工作稿，按意思分组（线色另由 wiki.jsx 之 TYPE_GROUP 定）；作者逐条审（docs/t0-review.md）。
export const relationsEn = {
  /* 傳承 Teaching */
  授业: 'Tutelage',
  传功: 'Transmitted art',
  问对: 'Dialogue',
  /* 遺承 Legacy */
  遗承: 'Legacy',
  衣钵: 'Mantle',
  /* 情愛 Love */
  夫妻: 'Married',
  伴侣: 'Partners',
  有情: 'Affection',
  私情: 'Secret love',
  倾慕: 'Adoration',
  定婚: 'Betrothed',
  /* 親緣 Kinship */
  亲缘: 'Kin',
  生父: 'Father and child',
  兄妹: 'Brother and sister',
  收养: 'Adoption',
  义女: 'Adoptive parent & daughter',
  /* 恩義 Grace & duty */
  恩义: 'Grace & duty',
  旧恩: 'Old kindness',
  知遇: 'Recognition',
  知契: 'Understanding',
  荐引: 'Sponsorship',
  救援: 'Rescue',
  解围: 'Relief',
  解危: 'Danger averted',
  义助: 'Aid freely given',
  收留: 'Shelter',
  照护: 'Care',
  看顾: 'Watchful care',
  代护: 'Guardianship in trust',
  受托: 'Entrustment',
  调停: 'Mediation',
  医患: 'Physician & patient',
  同盟: 'Alliance',
  宽宥: 'Forgiveness',
  舍身: 'Self-sacrifice',
  度化: 'Deliverance',
  引导: 'Guidance',
  引门: 'Introduction to the order',
  /* 誼 Friendship（及共事） */
  挚友: 'Close friends',
  知己: 'Confidants',
  知音: 'True listeners',
  同道: 'Like-minded',
  同契: 'Kindred bond',
  交谊: 'Friendly terms',
  相识: 'Acquaintance',
  亲近: 'Closeness',
  相谐: 'In tune',
  相依: 'Mutual reliance',
  同门: 'Fellow disciples',
  师兄: 'Senior & junior disciple',
  袍泽: 'Comrades in arms',
  同袍: 'Fellow soldiers',
  同僚: 'Colleagues',
  同队: 'Squadmates',
  协力: 'Working together',
  主副: 'Commander & deputy',
  主从: 'Superior & subordinate',
  辅佐: 'Principal & aide',
  参佐: 'Commander & staff officer',
  追随: 'Leader & follower',
  卫戍: 'Guard & charge',
  随军: 'Service on campaign',
  旧部: 'Former superior & subordinate',
  敬服: 'Deference',
  比试: 'Contest',
  切磋: 'Sparring',
  /* 嫌隙 Rift */
  嫌隙: 'Rift',
  冷眼: 'Cold shoulder',
  先斥后察: 'Scorn, then scrutiny',
  怨怼: 'Resentment',
  诬告: 'False accusation',
  /* 殺伐 Bloodshed */
  杀伐: 'Bloodshed',
  /* 未見（虛線）：未遂、未说开、未见 */
  未遂: 'Unfulfilled',
  未说开: 'Left unsaid',
  未见: 'Never met',
};
