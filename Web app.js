'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

    // 診断結果表示エリアの作成
    resultDivision.innerText = '';
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivision.appendChild(header);
  
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);
  
    // ツイートエリアの作成
  tweetDivision.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag=' +
  encodeURIComponent('進路相談室') +
  '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #進路相談室';

  tweetDivision.appendChild(anchor);
  
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivision.appendChild(script);
};

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

const answers = [
  '偏差値###userName###であれば北海道大学（札幌市北区 国立大学法人北海道大学）がおすすめです。',
  '偏差値###userName###であれば北海道教育大学（札幌市北区 国立大学法人北海道教育大学）がおすすめです。',
  '偏差値###userName###であれば室蘭工業大学（室蘭市 国立大学法人室蘭工業大学）がおすすめです。',
  '偏差値###userName###であれば小樽商科大学（小樽市 国立大学法人北海道国立大学機構）がおすすめです。',
  '偏差値###userName###であれば帯広畜産大学（帯広市 国立大学法人北海道国立大学機構がおすすめです。）',
  '偏差値###userName###であれば北見工業大学（北見市 国立大学法人北海道国立大学機構）がおすすめです。',
  '偏差値###userName###であれば旭川医科大学（旭川市 国立大学法人旭川医科大学)がおすすめです。',
  '偏差値###userName###であれば弘前大学（青森県弘前市 国立大学法人弘前大学）がおすすめです。',
  '偏差値###userName###であれば岩手大学（岩手県盛岡市 国立大学法人岩手大学）がおすすめです。',
  '偏差値###userName###であれば東北大学（宮城県仙台市青葉区 指定国立大学法人国立大学法人東北大学）がおすすめです。',
  '偏差値###userName###であれば宮城教育大学（宮城県仙台市青葉区 国立大学法人宮城教育大学）がおすすめです。',
  '偏差値###userName###であれば秋田大学（秋田県秋田市 国立大学法人秋田大学）がおすすめです。',
  '偏差値###userName###であれば山形大学（山形県山形市 国立大学法人山形大学）がおすすめです。',
  '偏差値###userName###であれば福島大学（福島県福島市 国立大学法人福島大学）がおすすめです。',
  '偏差値###userName###であれば東京大学（文京区 指定国立大学法人 国立大学法人東京大学）がおすすめです。',
  '偏差値###userName###であれば東京医科歯科大学（文京区 指定国立大学法人 国立大学法人東京医科歯科大学）がおすすめです。',
  '偏差値###userName###であれば東京外国語大学（府中市 国立大学法人東京外国語大学）がおすすめです。',
  '偏差値###userName###であれば東京学芸大学（小金井市 国立大学法人東京学芸大学）がおすすめです。',
  '偏差値###userName###であれば東京農工大学（府中市 国立大学法人東京農工大学）がおすすめです。',
  '偏差値###userName###であれば東京藝術大学（台東区 国立大学法人東京芸術大学）がおすすめです。',
  '偏差値###userName###であれば東京工業大学（目黒区 指定国立大学法人 国立大学法人東京工業大学）がおすすめです。',
  '偏差値###userName###であれば東京海洋大学（港区 国立大学法人東京海洋大学）がおすすめです。',
  '偏差値###userName###であればお茶の水女子大学（文京区 国立大学法人お茶の水女子大学）がおすすめです。',
  '偏差値###userName###であれば電気通信大学（調布市 国立大学法人電気通信大学）がおすすめです。',
  '偏差値###userName###であれば一橋大学（国立市 指定国立大学法人 国立大学法人一橋大学）がおすすめです。',
  '偏差値###userName###であれば政策研究大学院大学（港区 国立大学法人政策研究大学院大学）がおすすめです。',
  '偏差値###userName###であれば茨城大学（茨城県水戸市 国立大学法人茨城大学）がおすすめです。',
  '偏差値###userName###であれば筑波大学（茨城県つくば市 指定国立大学法人 国立大学法人筑波大学）がおすすめです。',
  '偏差値###userName###であれば筑波技術大学（茨城県つくば市 国立大学法人筑波技術大学）がおすすめです。',
  '偏差値###userName###であれば宇都宮大学（栃木県宇都宮市 国立大学法人宇都宮大学）がおすすめです。',
  '偏差値###userName###であれば群馬大学（群馬県前橋市 国立大学法人群馬大学）がおすすめです。',
  '偏差値###userName###であれば埼玉大学（埼玉県さいたま市桜区 国立大学法人埼玉大学）がおすすめです。',
  '偏差値###userName###であれば千葉大学（千葉県千葉市稲毛区 国立大学法人千葉大学）がおすすめです。',
  '偏差値###userName###であれば横浜国立大学（神奈川県横浜市保土ケ谷区 国立大学法人横浜国立大学）がおすすめです。',
  '偏差値###userName###であれば総合研究大学院大学（神奈川県三浦郡葉山町〈湘南国際村〉国立大学法人総合研究大学院大学）がおすすめです。',
  '偏差値###userName###であれば新潟大学（新潟県新潟市西区 国立大学法人新潟大学）がおすすめです。',
  '偏差値###userName###であれば長岡技術科学大学（新潟県長岡市 国立大学法人長岡技術科学大学）がおすすめです。',
  '偏差値###userName###であれば上越教育大学（新潟県上越市 国立大学法人上越教育大学）がおすすめです。',
  '偏差値###userName###であれば富山大学（富山県富山市 国立大学法人富山大学）がおすすめです。',
  '偏差値###userName###であれば金沢大学（石川県金沢市 国立大学法人金沢大学）がおすすめです。',
  '偏差値###userName###であれば北陸先端科学技術大学院大学（石川県能美市 国立大学法人北陸先端科学技術大学院大学）がおすすめです。',
  '偏差値###userName###であれば福井大学（福井県福井市 国立大学法人福井大学）がおすすめです。',
  '偏差値###userName###であれば山梨大学（山梨県甲府市 国立大学法人山梨大学）がおすすめです。',
  '偏差値###userName###であれば信州大学（長野県松本市 国立大学法人信州大学）がおすすめです。',
  '偏差値###userName###であれば岐阜大学（岐阜県岐阜市 国立大学法人東海国立大学機構）がおすすめです。',
  '偏差値###userName###であれば静岡大学（静岡県静岡市駿河区 国立大学法人静岡大学）がおすすめです。',
  '偏差値###userName###であれば浜松医科大学（静岡県浜松市東区 国立大学法人浜松医科大学）がおすすめです。',
  '偏差値###userName###であれば名古屋大学（愛知県名古屋市千種区 指定国立大学法人 国立大学法人東海国立大学機構）がおすすめです。',
  '偏差値###userName###であれば愛知教育大学（愛知県刈谷市 国立大学法人愛知教育大学）がおすすめです。',
  '偏差値###userName###であれば名古屋工業大学（愛知県名古屋市昭和区 国立大学法人名古屋工業大学）がおすすめです。',
  '偏差値###userName###であれば豊橋技術科学大学（愛知県豊橋市 国立大学法人豊橋技術科学大学）がおすすめです。',
  '偏差値###userName###であれば三重大学（三重県津市 国立大学法人三重大学）がおすすめです。',
  '偏差値###userName###であれば滋賀大学（滋賀県彦根市 国立大学法人滋賀大学）がおすすめです。',
  '偏差値###userName###であれば滋賀医科大学（滋賀県大津市 国立大学法人滋賀医科大学）がおすすめです。',
  '偏差値###userName###であれば京都大学（京都府京都市左京区 指定国立大学法人 国立大学法人京都大学）がおすすめです。',
  '偏差値###userName###であれば京都教育大学（京都府京都市伏見区 国立大学法人京都教育大学）がおすすめです。',
  '偏差値###userName###であれば京都工芸繊維大学（京都府京都市左京区 国立大学法人京都工芸繊維大学）がおすすめです。',
  '偏差値###userName###であれば大阪大学（大阪府吹田市 指定国立大学法人 国立大学法人大阪大学）がおすすめです。',
  '偏差値###userName###であれば大阪教育大学（大阪府柏原市 国立大学法人大阪教育大学）がおすすめです。',
  '偏差値###userName###であれば兵庫教育大学（兵庫県加東市 国立大学法人兵庫教育大学）がおすすめです。',
  '偏差値###userName###であれば神戸大学（兵庫県神戸市灘区 国立大学法人神戸大学）がおすすめです。',
  '偏差値###userName###であれば奈良教育大学（奈良県奈良市 国立大学法人奈良国立大学機構）がおすすめです。',
  '偏差値###userName###であれば奈良女子大学（奈良県奈良市 国立大学法人奈良国立大学機構）がおすすめです。',
  '偏差値###userName###であれば奈良先端科学技術大学院大学（奈良県生駒市 国立大学法人奈良先端科学技術大学院大学）がおすすめです。',
  '偏差値###userName###であれば和歌山大学（和歌山県和歌山市 国立大学法人和歌山大学）がおすすめです。',
  '偏差値###userName###であれば鳥取大学（鳥取県鳥取市 国立大学法人鳥取大学）がおすすめです。',
  '偏差値###userName###であれば島根大学（島根県松江市 国立大学法人島根大学）がおすすめです。',
  '偏差値###userName###であれば岡山大学（岡山県岡山市北区 国立大学法人岡山大学）がおすすめです。',
  '偏差値###userName###であれば広島大学（広島県東広島市 国立大学法人広島大学）がおすすめです。',
  '偏差値###userName###であれば山口大学（山口県山口市 国立大学法人山口大学）がおすすめです。',
  '偏差値###userName###であれば徳島大学（徳島県徳島市 国立大学法人徳島大学）がおすすめです。',
  '偏差値###userName###であれば鳴門教育大学（徳島県鳴門市 国立大学法人鳴門教育大学）がおすすめです。',
  '偏差値###userName###であれば香川大学（香川県高松市 国立大学法人香川大学）がおすすめです。',
  '偏差値###userName###であれば愛媛大学（愛媛県松山市 国立大学法人愛媛大学）がおすすめです。',
  '偏差値###userName###であれば高知大学（高知県高知市 国立大学法人高知大学）がおすすめです。',
  '偏差値###userName###であれば九州大学（福岡県福岡市西区 指定国立大学法人 国立大学法人九州大学）がおすすめです。',
  '偏差値###userName###であれば九州工業大学（福岡県北九州市戸畑区 国立大学法人九州工業大学）がおすすめです。',
  '偏差値###userName###であれば福岡教育大学（福岡県宗像市 国立大学法人福岡教育大学）がおすすめです。',
  '偏差値###userName###であれば佐賀大学（佐賀県佐賀市 国立大学法人佐賀大学）がおすすめです。',
  '偏差値###userName###であれば長崎大学（長崎県長崎市 国立大学法人長崎大学）がおすすめです。',
  '偏差値###userName###であれば熊本大学（熊本県熊本市中央区 国立大学法人熊本大学）がおすすめです。',
  '偏差値###userName###であれば大分大学（大分県大分市 国立大学法人大分大学）がおすすめです。',
  '偏差値###userName###であれば宮崎大学（宮崎県宮崎市 国立大学法人宮崎大学）がおすすめです。',
  '偏差値###userName###であれば鹿児島大学（鹿児島県鹿児島市 国立大学法人鹿児島大学）がおすすめです。',
  '偏差値###userName###であれば鹿屋体育大学（鹿児島県鹿屋市 国立大学法人鹿屋体育大学）がおすすめです。',
  '偏差値###userName###であれば琉球大学（沖縄県中頭郡西原町 国立大学法人琉球大学）がおすすめです。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
  
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('###userName###', userName);
  return result; 
}

//偏差値で区分する
if (userName > 80) {
  result = 東京大学;
}

   