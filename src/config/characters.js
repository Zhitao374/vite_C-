/**
 * 对话角色配置
 */
export const characters = {
  student: { avatar: '🧑', speaker: '同学' },
  robot:   { avatar: '🤖', speaker: '小 C' },
  teacher: { avatar: '👨‍🏫', speaker: '老师' },
  xiaoma:  { avatar: '🧑‍💻', speaker: '小码' }
};

export function getCharacter(who) {
  return characters[who] || { avatar: '🧑', speaker: '' };
}