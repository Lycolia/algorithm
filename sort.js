/**
 * [3, 4, 1, 2]
 * loop0->loop0: [3, 4, 1, 2]
 *   1 > 2 false
 *   ソートされてるのでそのまま
 * loop0->loop1: [3, 1, 4, 2]
 *   4 > 1 true
 *   tmp = 4 // 退避
 *   arr[j - 1] = 1 // 入れ替え
 *   arr[j] = 4 // 入れ替え
 * loop0->loop2: [1, 3, 4, 2]
 *   3 > 1 true
 *   tmp = 3 // 退避
 *   arr[j - 1] = 1 // 入れ替え
 *   arr[j] = 3 // 入れ替え
 *
 * loop1->loop0: [1, 3, 2, 4]
 *   4 > 2 true
 *   tmp = 4 // 退避
 *   arr[j - 1] = 2 // 入れ替え
 *   arr[j] = 4 // 入れ替え
 *
 * loop1->loop1: [1, 2, 3, 4]
 *   3 > 2 true
 *   tmp = 3 // 退避
 *   arr[j - 1] = 2 // 入れ替え
 *   arr[j] = 3 // 入れ替え
 *
 * loop1->loop2: [1, 2, 3, 4]
 *   1 > 2 false
 *
 * loop2->loop0: [1, 2, 3, 4]
 *   3 > 4 false
 *
 * @param {number[]} arr
 * @returns sorted
 */
const sortBubble = (arr) => {
  const len = arr.length;
  const maxIdx = len - 1;

  for (i = 0; i < len; i++) {
    for (j = maxIdx; j >= i + 1; j--) {
      if (arr[j - 1] > arr[j]) {
        // 同値であれば交換が発生しないので安定ソート
        const tmp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = tmp;
      }
      console.log('  jdx', arr[j], arr);
    }
    console.log('idx', arr[i], arr);
  }

  return arr;
};

/**
 * jdx 2 [ 3, 4, 1, 2 ]
 * jdx 4 [ 3, 1, 4, 2 ]
 * jdx 3 [ 1, 3, 4, 2 ]
 * idx 1 [ 1, 3, 4, 2 ]
 * jdx 4 [ 1, 3, 2, 4 ]
 * jdx 3 [ 1, 2, 3, 4 ]
 * idx 2 [ 1, 2, 3, 4 ]
 * jdx 4 [ 1, 2, 3, 4 ]
 * idx 3 [ 1, 2, 3, 4 ]
 * idx 4 [ 1, 2, 3, 4 ]
 * result [ 1, 2, 3, 4 ]
 */
const bubble = () => {
  console.log('== bubble sort ==');
  const src = [3, 4, 1, 2];
  console.log('result', sortBubble(src));
};

/**
 * [3, 4, 1, 2]
 *
 * loop0->loop0
 *   minIdx 0
 *   4 < 3: false
 * loop0->loop1
 *   1 < 3: true -> minIdx 2
 * loop0->loop2
 *   2 < 1: false
 *
 * i = 0
 * tmp = 3
 * [i] = 1
 * [minIdx] = 3
 * ->[1, 4, 3, 2]
 *
 * loop1->loop0
 *   3 < 4 true -> minIdx = 2
 * loop1->loop1
 *   minIdx 2
 *   2 < 3 true -> minIdx = 3
 *
 * i = 1
 * tmp = 4
 * [i] = 2
 * [minIdx] = 4
 * ->[1, 2, 3, 4]
 *
 * 以後はソートされているため i = minIdx となり
 * 同じ添字の入れ替えが起きるのみ
 * @param {number[]} arr
 * @returns
 */
const sortSelected = (arr) => {
  const len = arr.length;
  const maxIdx = len - 1;

  for (i = 0; i < maxIdx; i++) {
    // 現在の添字を最小と仮定する
    let minIdx = i;
    console.log('idx', i);
    for (j = i + 1; j < len; j++) {
      // iの次から配列の終端までを走査
      if (arr[j] < arr[minIdx]) {
        // 現在の最小値未満があれば
        // 添字を記録する
        minIdx = j;
        console.log('  jdx', j, 'min-value', arr[j]);
      }
    }

    // 同値であれば交換が発生しないので安定ソート
    // idxをバッファ
    const tmp = arr[i];
    // 最小値と入れ替え
    arr[i] = arr[minIdx];
    // バッファを最小値へ
    arr[minIdx] = tmp;

    console.log('idx', i, arr);
  }

  return arr;
};

const selected = () => {
  console.log('== selected sort ==');
  const src = [3, 4, 1, 2];
  console.log('result', sortSelected(src));
};

/**
 * [3, 4, 1, 2]
 * loop0->loop0
 *   3 > 4 false
 *
 * loop1->loop0
 *   4 > 1 true
 *   [1] = 1
 *   [2] = 4
 * ->[3, 1, 4, 2]
 *
 * loop1->loop1
 *   3 > 1 true
 *   [0] = 1
 *   [1] = 3
 * ->[1, 3, 4, 2]
 *
 * loop2->loop0
 *   4 > 2 true
 *   [2] = 2
 *   [3] = 4
 * ->[1, 3, 2, 4]
 *
 * loop2->loop1
 *   3 > 2 true
 *   [1] = 2
 *   [2] = 3
 * ->[1, 2, 3, 4]
 * @param {number[]} arr
 * @returns
 */
const insertSort = (arr) => {
  const len = arr.length;

  for (i = 1; i < len; i++) {
    for (j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
      const tmp = arr[j - 1];
      arr[j - 1] = arr[j];
      arr[j] = tmp;
      console.log('  jdx', j, arr);
    }
    console.log('idx', i, arr);
  }

  return arr;
};

const insert = () => {
  console.log('== insert sort ==');
  const src = [3, 4, 1, 2];
  console.log('result', insertSort(src));
};

bubble();
selected();
insert();
