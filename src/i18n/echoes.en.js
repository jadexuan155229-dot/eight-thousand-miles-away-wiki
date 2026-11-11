// English overlay for the echoes layer (余波). Keys are the Chinese source text,
// so the Chinese fallback is lossless. Author-approved register (2026-11-09):
// noun phrases first, effect over literalness, a little mixing allowed.
// This layer is an author's gloss, kept distinct from the factual layer.

export const echoModesEn = {
  "声名悬而未决": "a name left unsettled",
  "从名字到碑文": "a name turned inscription",
  "替亡者守着": "a vigil for the dead",
  "以无功自铭": "a name taken from failure",
  "预见而不被听": "foresight unheeded",
  "忠诚成为负担": "fidelity as burden",
  "为尊者讳": "silence out of reverence",
  "接下兄长的位置": "his cousin's place, inherited",
  "以打代哭": "grief in blows",
  "自风筝上目睹": "a view from the kite",
  "从死者身上脱甲": "armor off the dead",
  "从文书里认识这场仗": "a battle known on paper",
  "八岁，不记得": "eight years old, no memory",
  "穿上他人的记忆": "another man's memory, worn",
  "同一场战事的另一端": "the other end of the same war",
  "不曾在场": "never there",
  "承接一个残营": "a broken garrison, inherited",
  "连死讯也延迟": "even his death, deferred",
  "成为他的影子": "his shadow",
  "未说开的话留在原处": "the unsaid, left in place",
  "以旧物送别": "an old gift returned",
  "在门口接": "a reception at the gate",
  "为新主缝旗": "a banner for the successor",
  "填一个从未见过的空位": "an absence never witnessed, filled",
  "从死者处偷来的招": "a move stolen from the dead",
  "为陌生人复原曲调": "a stranger's tune, restored",
  "从未相见": "never met",
  "把败绩带出关外": "the defeat, carried beyond the pass",
  "终生不知": "a lifelong unknowing",
  "以照料作偿": "atonement by care",
  "医者的封口": "a physician's sealed lips",
  "从簿上一个字开始": "one word in a ledger",
  "不问，也不说破": "no question, no disclosure",
  "承接一条不知来处的线": "a lineage of unseen origin",
  "恰在交替处到来": "an arrival in the changeover",
  "下落要等人来确认": "a fate awaiting confirmation",
  "带着一道不愈的伤": "a wound that never closed",
  "守着火种": "keeper of the embers",
  "把人送出去，自己留下": "sending others out, staying behind",
  "留在残营": "among those who stayed",
  "在丧中成人": "a coming of age in mourning",
  "绕了很远才回去": "the long way back",
  "失散在外，死在别处": "scattered, and fallen elsewhere",
  "认出旧恩，以命相还": "an old debt recognized, repaid in full",
  "先怨，后服，终老其地": "resentment, then respect, then a lifetime",
  "留下，又不得回应而去": "a stay that ended unanswered",
  "为一座城留一纸愿": "a vow on paper, for a city",
  "六年后，只抽出一天": "one day, six years late",
  "想把人接回家": "an offer of home, declined",
  "认得这种灭顶之灾": "a ruin she had seen before",
  "把两个忌日对在一起": "two death-days, found to be one",
};

export const shocksEn = {
  yanmen745: { title: "The Battle of Yanmen Pass", gist: "A war's wound passed down the generations", axis: "Distance from the battle" },
  lvdingyi755: { title: "The Death of Lü Dingyi (Kept Secret)", gist: "How the place of the absent is filled", axis: "Distance from the dead" },
  leitai757: { title: "Lifei's Defeat by Qiu Hong", gist: "Many ways of keeping one secret", axis: "When one learned of the old wound" },
  tiance756: { title: "The Fall of the Tiance Garrison", gist: "After a city is lost, where each one goes", axis: "Where one went after that night" },
};

export const bandsEn = {
  yanmen745: { dead: "The dead", live: "Those who lived it", young: "Present, but young", after: "Those who came after", far: "The other side" },
  lvdingyi755: { dead: "The dead", near: "Old comrades in camp", unmet: "Those who never met him", out: "Rivals and outsiders" },
  leitai757: { self: "The one involved", before: "Knew beforehand", during: "Learned in the moment", after: "Never asked, never said", result: "Knew only the result", never: "Never knew", none: "Did not know, did not need to" },
  tiance756: { dead: "The dead", stay: "Left behind enemy lines", west: "Withdrew west", aid: "Those who came to help", out: "Outside the walls, and after" },
};

export const echoUiEn = {
  余波: "Aftershocks",
  作者按: "Author's gloss",
  所系之事: "Events that bear on them",
  震源: "Shock",
  逝者: "The dead",
  記憶方式: "Mode of remembering",
  在場姿態: "Position",
  回響節點: "Echoes through the years",
  無定年: "Undated",
  前事: "Before",
  人物卡: "From the character profile",
  查看檔案: "Open profile",
  導語: "Each shock is an event that hangs over many people. Each person is placed by their distance from it, and each remembers it differently. Click a name to read their echoes.",
  層註: "This layer is an author's gloss. It is kept apart from the factual layer, and its readings are the author's.",
};

export const shockTitle = (locale, s) => locale === "en" ? shocksEn[s.id]?.title ?? s.title : s.title;
export const shockGist = (locale, s) => locale === "en" ? shocksEn[s.id]?.gist ?? s.gist : s.gist;
export const shockAxis = (locale, s) => locale === "en" ? shocksEn[s.id]?.axis ?? s.axis : s.axis;
export const bandLabel = (locale, shockId, key, zh) => locale === "en" ? bandsEn[shockId]?.[key] ?? zh : zh;
export const modeText = (locale, mode) => locale === "en" ? echoModesEn[mode] ?? mode : mode;
export const echoUi = (locale, key) => locale === "en" ? echoUiEn[key] ?? key : key;
