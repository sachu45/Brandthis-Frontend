import { useState } from 'react';
import { QUESTIONNAIRE_QUESTIONS } from '../../data/constants';

interface QuestionnaireProps {
  /** Called with every answer once the last question is confirmed. */
  onComplete: (answers: Record<number, string>) => void;
}

/** Two-question intake shown between the fake fetch and the logo confirmation. */
export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const question = QUESTIONNAIRE_QUESTIONS[index];
  const isLast = index === QUESTIONNAIRE_QUESTIONS.length - 1;
  const selected = answers[index];

  function goNext() {
    if (!selected) return;
    if (isLast) onComplete(answers);
    else setIndex((current) => current + 1);
  }

  return (
    <div className="questionnaire">
      <div className="questionnaire-shell">
        <div className="questionnaire-progress">
          {QUESTIONNAIRE_QUESTIONS.map((item, itemIndex) => {
            const state =
              itemIndex === index ? ' active' : itemIndex < index ? ' done' : '';
            return (
              <div className={'progress-step' + state} key={item.eyebrow}>
                <div className="progress-dot">
                  {itemIndex < index
                    ? '✓'
                    : String(itemIndex + 1).padStart(2, '0')}
                </div>
                <span>{item.eyebrow.split(' / ')[1]}</span>
              </div>
            );
          })}
        </div>

        <div className="questionnaire-card">
          <div className="questionnaire-eyebrow">{question.eyebrow}</div>
          <h1>{question.title}</h1>
          <p className="question-help">{question.help}</p>

          <div className="question-options">
            {question.options.map((option) => (
              <button
                key={option}
                className={
                  'question-option' + (selected === option ? ' selected' : '')
                }
                onClick={() =>
                  setAnswers((current) => ({ ...current, [index]: option }))
                }
              >
                {option}
              </button>
            ))}
          </div>

          <div className="questionnaire-footer">
            <span />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                onClick={() => setIndex((current) => Math.max(0, current - 1))}
              >
                Back
              </button>
              <button className="next" onClick={goNext} disabled={!selected}>
                {isLast ? 'Continue →' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
