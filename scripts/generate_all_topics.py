#!/usr/bin/env python3
import json
import os

target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/data/topics'))
os.makedirs(target_dir, exist_ok=True)

def write_ts_topic(file_name, export_name, beg_list, med_list, hard_list):
    content = f"""import {{ InterviewQuestionItem }} from '../interviewQuestionsMeta';

export const {export_name}: {{
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
}} = {{
  beginner: {json.dumps(beg_list, indent=2)},
  medium: {json.dumps(med_list, indent=2)},
  hard: {json.dumps(hard_list, indent=2)}
}};
"""
    file_path = os.path.join(target_dir, file_name)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated {file_name}: {len(beg_list)} Beg, {len(med_list)} Med, {len(hard_list)} Hard")

def q(qid, topic, diff, cat, question, key_concepts, weak_spots, strong_indicators, hint, answer):
    return {
        "id": qid,
        "topic": topic,
        "difficulty": diff,
        "category": cat,
        "question": question,
        "keyConcepts": key_concepts,
        "commonWeakSpots": weak_spots,
        "strongIndicators": strong_indicators,
        "hint": hint,
        "sampleGoodAnswer": answer
    }

print("Python generator initialized.")
