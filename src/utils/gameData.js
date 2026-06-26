export const QUESTIONS = [
  {
    id: 1,
    text: 'Which of these is a real risk of drug use on a developing brain?',
    options: [
      { text: 'It can permanently alter memory and learning ability', correct: true },
      { text: 'It improves focus and creativity long-term', correct: false },
      { text: 'It only affects people with a family history of addiction', correct: false },
    ],
    explanation: 'The brain develops until around age 25. Drug use during this period can cause lasting changes to memory, decision-making, and impulse control.',
  },
  {
    id: 2,
    text: 'A close friend offers you a substance at a party. What\'s the strongest response?',
    options: [
      { text: '"Maybe just this once, it won\'t matter."', correct: false },
      { text: '"No thanks - I\'m good. Let\'s do something else."', correct: true },
      { text: '"I\'ll try a tiny bit so I don\'t seem rude."', correct: false },
    ],
    explanation: 'A clear, calm refusal with an alternative keeps your boundaries firm without creating conflict. You don\'t owe anyone an explanation.',
  },
  {
    id: 3,
    text: 'What\'s the first step if someone you know shows signs of addiction?',
    options: [
      { text: 'Ignore it - it\'s their personal choice', correct: false },
      { text: 'Confront them aggressively to scare them straight', correct: false },
      { text: 'Talk to a trusted adult or helpline with care', correct: true },
    ],
    explanation: 'Addiction is a health issue, not a moral failure. Connecting someone to professional support - not shame or confrontation - is the most effective first step.',
  },
  {
    id: 4,
    text: 'What is one common consequence of regular drug use?',
    options: [
      { text: 'Increased risk of addiction and dependency', correct: true },
      { text: 'Guaranteed improvement in physical fitness', correct: false },
      { text: 'No effect on mental health', correct: false },
    ],
    explanation: 'Regular drug use can change how the brain functions, making it harder to stop and increasing the risk of addiction, anxiety, and other health problems.',
  },
  {
    id: 5,
    text: 'Why is peer pressure often linked to drug use among teenagers?',
    options: [
      { text: 'People may feel pressured to fit in or be accepted', correct: true },
      { text: 'Peer pressure has no influence on decision-making', correct: false },
      { text: 'Only adults experience peer pressure', correct: false },
    ],
    explanation: 'Many young people try drugs because they feel pressure from friends or social groups. Learning to say no and making independent choices can help prevent drug use.',
  },
]

import { Heart, Rocket, Home, Users, Sparkles, Bird } from 'lucide-react'

export const VALUES = [
  { id: 'health', label: 'My health', icon: Heart, color: 'green' },
  { id: 'future', label: 'My future', icon: Rocket, color: 'purple' },
  { id: 'family', label: 'My family', icon: Home, color: 'teal' },
  { id: 'friends', label: 'My friends', icon: Users, color: 'blue' },
  { id: 'dreams', label: 'My dreams', icon: Sparkles, color: 'amber' },
  { id: 'freedom', label: 'My freedom', icon: Bird, color: 'coral' },
]

export const buildPledgeText = (name, values) => {
  if (!values.length) return `I, ${name}, pledge to stay drug-free.`
  const labels = values.map(v => v.label.toLowerCase())
  const list = labels.length === 1
    ? labels[0]
    : labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1]
  return `I, ${name}, pledge to stay drug-free. I choose this for ${list} - because my life is worth protecting.`
}
