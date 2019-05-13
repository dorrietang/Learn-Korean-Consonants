from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# 0 = not started, 1 = clicked into, 2 = submitted quiz
progress = {
   "bp": 0,
   "sj": 0,
   "dt": 0,
   "gk": 0
}

bp_data = [
   {
      "consonant": "ㅂ",
      "image": "ㅂ.png",
      "sound": "ㅂ.mp3",
      "linguistic": "Plain bilabial stop",
      "description": "between a soft English p and b sound",
      "examples": [
         {
            "word": "백",
            "image": "백.png",
            "sound": "백.mp3",
            "pronunciation": "peck",
            "meaning": "hundred"
         },
         {
            "word": "불",
            "image": "불.png",
            "sound": "불.mp3",
            "pronunciation": "pool",
            "meaning": "fire"
         },
         {
            "word": "밥",
            "image": "밥.png",
            "sound": "밥.mp3",
            "pronunciation": "pap",
            "meaning": "rice"
         }
      ]
   },
   {
      "consonant": "ㅃ",
      "image": "ㅃ.png",
      "sound": "ㅃ.mp3",
      "linguistic": "Tense bilabial stop",
      "description": "like a solid English b sound",
      "examples": [
         {
            "word": "빵",
            "image": "빵.png",
            "sound": "빵.mp3",
            "pronunciation": "bang",
            "meaning": "bread"
         },
         {
            "word": "쁘",
            "image": "쁘.png",
            "sound": "쁘.mp3",
            "pronunciation": "buh",
            "meaning": "good"
         },
         {
            "word": "뻐",
            "image": "뻐.png",
            "sound": "뻐.mp3",
            "pronunciation": "boh",
            "meaning": ""
         }
      ]
   },
   {
      "consonant": "ㅍ",
      "image": "ㅍ.png",
      "sound": "ㅍ.mp3",
      "linguistic": "Aspirated bilabial stop",
      "description": "like an English p sound with a puff of air",
      "examples": [
         {
            "word": "팔",
            "image": "팔.png",
            "sound": "팔.mp3",
            "pronunciation": "p'al",
            "meaning": "arm"
         },
         {
            "word": "피",
            "image": "피.png",
            "sound": "피.mp3",
            "pronunciation": "p'ee",
            "meaning": "blood"
         },
         {
            "word": "퓨",
            "image": "퓨.png",
            "sound": "퓨.mp3",
            "pronunciation": "p'yoo",
            "meaning": ""
         }
      ]
   },
]

sj_data = [
   {
      "consonant": "ㅅ",
      "image": "ㅅ.png",
      "sound": "ㅅ.mp3",
      "linguistic": "Plain/aspirated alveolar fricative",
      "description": "like a very soft English s or sh sound",
      "examples": [
         {
            "word": "삼",
            "image": "삼.png",
            "sound": "삼.mp3",
            "pronunciation": "sahm",
            "meaning": "three"
         },
         {
            "word": "시",
            "image": "시.png",
            "sound": "시.mp3",
            "pronunciation": "shee",
            "meaning": "poem"
         },
         {
            "word": "생",
            "image": "생.png",
            "sound": "생.mp3",
            "pronunciation": "saeng",
            "meaning": "student"
         }
      ]
   },
   {
      "consonant": "ㅆ",
      "image": "ㅆ.png",
      "sound": "ㅆ.mp3",
      "linguistic": "Tense alveolar fricative",
      "description": "like a solid English s sound",
      "examples": [
         {
            "word": "쌀",
            "image": "쌀.png",
            "sound": "쌀.mp3",
            "pronunciation": "s'al",
            "meaning": "rice"
         },
         {
            "word": "씨",
            "image": "씨.png",
            "sound": "씨.mp3",
            "pronunciation": "sh'ee",
            "meaning": "sir"
         },
         {
            "word": "싸",
            "image": "싸.png",
            "sound": "싸.mp3",
            "pronunciation": "s'a",
            "meaning": "cheap"
         }
      ]
   },
   {
      "consonant": "ㅈ",
      "image": "ㅈ.png",
      "sound": "ㅈ.mp3",
      "linguistic": "Plain palatal affricate",
      "description": "between a soft English j and ch sound",
      "examples": [
         {
            "word": "저",
            "image": "저.png",
            "sound": "저.mp3",
            "pronunciation": "choh",
            "meaning": "me"
         },
         {
            "word": "장",
            "image": "장.png",
            "sound": "장.mp3",
            "pronunciation": "chang",
            "meaning": "chapter"
         },
         {
            "word": "쥐",
            "image": "쥐.png",
            "sound": "쥐.mp3",
            "pronunciation": "j-u-i",
            "meaning": "rat"
         }
      ]
   },
   {
      "consonant": "ㅉ",
      "image": "ㅉ.png",
      "sound": "ㅉ.mp3",
      "linguistic": "Tense palatal affricate",
      "description": "like a solid English j, almost zh sound",
      "examples": [
         {
            "word": "짠",
            "image": "짠.png",
            "sound": ".mp3",
            "pronunciation": "zhan",
            "meaning": ""
         },
         {
            "word": "쩌",
            "image": "쩌.png",
            "sound": ".mp3",
            "pronunciation": "zhoh",
            "meaning": ""
         }
      ]
   },
   {
      "consonant": "ㅊ",
      "image": "ㅊ.png",
      "sound": "ㅊ.mp3",
      "linguistic": "Aspirated palatal affricate",
      "description": "like a hard English ch sound with lots of air",
      "examples": [
         {
            "word": "책",
            "image": "책.png",
            "sound": "책.mp3",
            "pronunciation": "ch'eck",
            "meaning": "book"
         },
         {
            "word": "최",
            "image": "최.png",
            "sound": "최.mp3",
            "pronunciation": "chwe",
            "meaning": "Choi, the Korean surname"
         },
         {
            "word": "칠",
            "image": "칠.png",
            "sound": "칠.mp3",
            "pronunciation": "ch'eel",
            "meaning": "seven"
         }
      ]
   },
]

dt_data = [
   {
      "consonant": "ㄷ",
      "image": "ㄷ.png",
      "sound": "ㄷ.mp3",
      "linguistic": "Plain alveolar stop",
      "description": "between a soft English d and t sound",
      "examples": [
         {
            "word": "대",
            "image": "대.png",
            "sound": "대.mp3",
            "pronunciation": "teh",
            "meaning": "big"
         },
         {
            "word": "뒤",
            "image": "뒤.png",
            "sound": "뒤.mp3",
            "pronunciation": "twee",
            "meaning": "behind"
         },
         {
            "word": "도",
            "image": "도.png",
            "sound": "도.mp3",
            "pronunciation": "toh",
            "meaning": "also"
         }
      ]
   },
   {
      "consonant": "ㄸ",
      "image": "ㄸ.png",
      "sound": "ㄸ.mp3",
      "linguistic": "Tense alveolar stop",
      "description": "like a solid English d sound",
      "examples": [
         {
            "word": "딸",
            "image": "딸.png",
            "sound": "딸.mp3",
            "pronunciation": "d'al",
            "meaning": "daughter"
         },
         {
            "word": "떻",
            "image": "떻.png",
            "sound": "떻.mp3",
            "pronunciation": "d'oh",
            "meaning": "how"
         }
      ]
   },
   {
      "consonant": "ㅌ",
      "image": "ㅌ.png",
      "sound": "ㅌ.mp3",
      "linguistic": "Aspirated alveolar stop",
      "description": "like an English t sound with a puff of air",
      "examples": [
         {
            "word": "티",
            "image": "티.png",
            "sound": "티.mp3",
            "pronunciation": "t'ee",
            "meaning": ""
         },
         {
            "word": "텔",
            "image": "텔.png",
            "sound": "텔.mp3",
            "pronunciation": "t'el",
            "meaning": ""
         },
         {
            "word": "톤",
            "image": "톤.png",
            "sound": "톤.mp3",
            "pronunciation": "t'ohn",
            "meaning": ""
         }
      ]
   },
]

gk_data = [
   {
      "consonant": "ㄱ",
      "image": "ㄱ.png",
      "sound": "ㄱ.mp3",
      "linguistic": "Plain velar stop",
      "description": "between a soft English g and k sound",
      "examples": [
         {
            "word": "강",
            "image": "강.png",
            "sound": "강.mp3",
            "pronunciation": "kang",
            "meaning": "river"
         },
         {
            "word": "구",
            "image": "구.png",
            "sound": "구.mp3",
            "pronunciation": "koo",
            "meaning": "nine"
         },
         {
            "word": "교",
            "image": "교.png",
            "sound": "교.mp3",
            "pronunciation": "kyo",
            "meaning": "school"
         }
      ]
   },
   {
      "consonant": "ㄲ",
      "image": "ㄲ.png",
      "sound": "ㄲ.mp3",
      "linguistic": "Tense velar stop",
      "description": "like a solid English g sound",
      "examples": [
         {
            "word": "깨",
            "image": "깨.png",
            "sound": "깨.mp3",
            "pronunciation": "g'ay",
            "meaning": "sesame"
         },
         {
            "word": "끄",
            "image": "끄.png",
            "sound": "끄.mp3",
            "pronunciation": "g'uh",
            "meaning": ""
         }
      ]
   },
   {
      "consonant": "ㅋ",
      "image": "ㅋ.png",
      "sound": "ㅋ.mp3",
      "linguistic": "Plain velar stop",
      "description": "like an English k sound with a puff of air",
      "examples": [
         {
            "word": "키",
            "image": "키.png",
            "sound": "키.mp3",
            "pronunciation": "k'ee",
            "meaning": "key"
         },
         {
            "word": "콩",
            "image": "콩.png",
            "sound": "콩.mp3",
            "pronunciation": "k'ong",
            "meaning": "bean"
         },
         {
            "word": "캐",
            "image": "캐.png",
            "sound": "캐.mp3",
            "pronunciation": "k'ay",
            "meaning": ""
         }
      ]
   },
]

bp_questions = [
	{
		"question": "ㅃ.mp3",
		"answers": {
			"a": 'ㅂ',
			"b": 'ㅃ',
			"c": 'ㅍ'
		},
		"correctAnswer": 'b'
	},
	{
		"question": "ㅂ.mp3",
		"answers": {
			"a": 'ㅂ',
			"b": 'ㅃ',
			"c": 'ㅍ'
		},
		"correctAnswer": 'a'
	},
   {
		"question": "ㅃ.mp3",
		"answers": {
			"a": 'ㅂ',
			"b": 'ㅃ',
			"c": 'ㅍ'
		},
		"correctAnswer": 'b'
	},
   {
		"question": "ㅍ.mp3",
		"answers": {
			"a": 'ㅂ',
			"b": 'ㅃ',
			"c": 'ㅍ'
		},
		"correctAnswer": 'c'
	},
   {
		"question": "ㅂ.mp3",
		"answers": {
			"a": 'ㅂ',
			"b": 'ㅃ',
			"c": 'ㅍ'
		},
		"correctAnswer": 'a'
	}
]

sj_questions = [
	{
		"question": "ㅈ.mp3",
		"answers": {
			"a": 'ㅅ',
         "b": 'ㅆ',
			"c": 'ㅈ',
         "d": 'ㅉ',
			"e": 'ㅊ'
		},
		"correctAnswer": 'c'
	},
	{
		"question": "ㅅ.mp3",
		"answers": {
			"a": 'ㅅ',
         "b": 'ㅆ',
			"c": 'ㅈ',
			"d": 'ㅉ',
			"e": 'ㅊ'
		},
		"correctAnswer": 'a'
	},
   {
		"question": "ㅉ.mp3",
		"answers": {
			"a": 'ㅅ',
         "b": 'ㅆ',
			"c": 'ㅈ',
			"d": 'ㅉ',
			"e": 'ㅊ'
		},
		"correctAnswer": 'd'
	},
   {
		"question": "ㅊ.mp3",
		"answers": {
			"a": 'ㅅ',
         "b": 'ㅆ',
			"c": 'ㅈ',
			"d": 'ㅉ',
			"e": 'ㅊ'
		},
		"correctAnswer": 'e'
	},
   {
		"question": "ㅆ.mp3",
		"answers": {
			"a": 'ㅅ',
         "b": 'ㅆ',
			"c": 'ㅈ',
			"d": 'ㅉ',
			"e": 'ㅊ'
		},
		"correctAnswer": 'b'
	}
]

dt_questions = [
	{
		"question": "ㄸ.mp3",
		"answers": {
			"a": 'ㄷ',
			"b": 'ㄸ',
			"c": 'ㅌ'
		},
		"correctAnswer": 'b'
	},
	{
		"question": "ㄷ.mp3",
		"answers": {
			"a": 'ㄷ',
			"b": 'ㄸ',
			"c": 'ㅌ'
		},
		"correctAnswer": 'a'
	},
   {
		"question": "ㅌ.mp3",
		"answers": {
			"a": 'ㄷ',
			"b": 'ㄸ',
			"c": 'ㅌ'
		},
		"correctAnswer": 'c'
	},
   {
		"question": "ㄷ.mp3",
		"answers": {
			"a": 'ㄷ',
			"b": 'ㄸ',
			"c": 'ㅌ'
		},
		"correctAnswer": 'a'
	},
   {
		"question": "ㄸ.mp3",
		"answers": {
			"a": 'ㄷ',
			"b": 'ㄸ',
			"c": 'ㅌ'
		},
		"correctAnswer": 'b'
	}
]

gk_questions = [
	{
		"question": "ㄱ.mp3",
		"answers": {
			"a": 'ㄱ',
			"b": 'ㄲ',
			"c": 'ㅋ'
		},
		"correctAnswer": 'a'
	},
	{
		"question": "ㄲ.mp3",
		"answers": {
			"a": 'ㄱ',
			"b": 'ㄲ',
			"c": 'ㅋ'
		},
		"correctAnswer": 'b'
	},
   {
		"question": "ㄱ.mp3",
		"answers": {
			"a": 'ㄱ',
			"b": 'ㄲ',
			"c": 'ㅋ'
		},
		"correctAnswer": 'a'
	},
   {
		"question": "ㅋ.mp3",
		"answers": {
			"a": 'ㄱ',
			"b": 'ㄲ',
			"c": 'ㅋ'
		},
		"correctAnswer": 'c'
	},
   {
		"question": "ㄲ.mp3",
		"answers": {
			"a": 'ㄱ',
			"b": 'ㄲ',
			"c": 'ㅋ'
		},
		"correctAnswer": 'b'
	}
]

# Linguistic characteristics:
ling_defs = {
   "aspirated": "accompanied by a burst of breath",
   "plain": "pronounced with less pressure or muscular effort",
   "tense": "pronounced with more pressure or muscular effort",
   "alveolar": "articulated with the tongue against or close to the back of the teeth",
   "bilabial": "articulated with both lips",
   "palatal": "articulated with the body of the tongue against the middle of the roof of the mouth",
   "velar": "articulated with the back of the tongue against the back of the roof of the mouth",
   "affricate": "sound is made by forcing air through a narrow channel in the mouth",
   "fricative": "sound is made by stopping airflow, then releasing air",
   "stop": "sound is made as airflow stops"
}

@app.route('/')
def landing():
   return render_template('landing.html')

@app.route('/home')
def home():
   return render_template('home.html', progress=progress)

@app.route('/<cons>')
def learn(cons=None):
   if cons == "bp":
      return render_template('learn.html', data=bp_data, ling=ling_defs)
   elif cons == "sj":
      return render_template('learn.html', data=sj_data, ling=ling_defs)
   elif cons == "dt":
      return render_template('learn.html', data=dt_data, ling=ling_defs)
   elif cons == "gk":
      return render_template('learn.html', data=gk_data, ling=ling_defs)

@app.route('/<cons>/quiz')
def quiz(cons=None):
   if cons == "bp":
      return render_template('quiz.html', data=bp_questions)
   elif cons == "sj":
      return render_template('quiz.html', data=sj_questions)
   elif cons == "dt":
      return render_template('quiz.html', data=dt_questions)
   elif cons == "gk":
      return render_template('quiz.html', data=gk_questions)

@app.route('/update_progress', methods=['POST'])
def update_progress():
   global progress

   json_data = request.get_json()
   section = json_data["section"]
   stage = json_data["stage"]

   progress[section] = stage

   return jsonify(progress=progress)

if __name__ == '__main__':
   app.run(debug = True)