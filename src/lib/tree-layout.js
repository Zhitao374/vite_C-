/**
 * 树布局工具
 * 输入：嵌套树结构 { id, value, left, right }
 * 输出：每个节点的像素坐标
 */

export function layoutTree(root, stageW, stageH) {
  if (!root) return {};

  const NODE_W = 50;
  const NODE_H = 50;
  const LEVEL_GAP = 80;
  const NODE_GAP = 20;

  const positions = {};
  let xCounter = 0;
  let maxDepth = 0;

  function calc(node, depth) {
    if (!node) return;
    calc(node.left, depth + 1);
    positions[node.id] = {
      colIdx: xCounter++,
      depth
    };
    maxDepth = Math.max(maxDepth, depth);
    calc(node.right, depth + 1);
  }

  calc(root, 0);

  const totalCols = xCounter;
  const totalWidth = totalCols * NODE_W + (totalCols - 1) * NODE_GAP;
  const offsetX = (stageW - totalWidth) / 2;

  const totalHeight = (maxDepth + 1) * NODE_H + maxDepth * (LEVEL_GAP - NODE_H);
  const offsetY = (stageH - totalHeight) / 2;

  Object.values(positions).forEach(p => {
    p.x = offsetX + p.colIdx * (NODE_W + NODE_GAP) + NODE_W / 2;
    p.y = offsetY + p.depth * LEVEL_GAP + NODE_H / 2;
  });

  return positions;
}

export function flattenTree(root, result = []) {
  if (!root) return result;
  result.push({ id: root.id, value: root.value });
  flattenTree(root.left, result);
  flattenTree(root.right, result);
  return result;
}

export function buildEdges(root, positions, visited, currentVisit, result = []) {
  if (!root) return result;

  function addEdge(parent, child) {
    if (!parent || !child) return;
    const p = positions[parent.id];
    const c = positions[child.id];
    if (!p || !c) return;
    result.push({
      id: parent.id + '-' + child.id,
      x1: p.x, y1: p.y,
      x2: c.x, y2: c.y,
      visited: visited.has(child.id) || child.id === currentVisit
    });
  }

  addEdge(root, root.left);
  addEdge(root, root.right);
  buildEdges(root.left, positions, visited, currentVisit, result);
  buildEdges(root.right, positions, visited, currentVisit, result);
  return result;
}