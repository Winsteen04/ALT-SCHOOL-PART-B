// problem 1  

function deepEqual(objA, objB) {
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

// problem 2

function diffObjects(oldObj, newObj) {
  const added = {};
  const removed = {};
  const changed = {};

  for (const key of Object.keys(newObj)) {
    if (!Object.hasOwn(oldObj, key)) {
      added[key] = newObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      changed[key] = { from: oldObj[key], to: newObj[key] };
    }
  }

  for (const key of Object.keys(oldObj)) {
    if (!Object.hasOwn(newObj, key)) {
      removed[key] = oldObj[key];
    }
  }

  return { added, removed, changed };
}

console.log(
  diffObjects(
    { name: "Setemi", role: "Engineer", country: "Jamaica" },
    { name: "Setemi", role: "Senior Engineer", city: "Kingston" }
  )
);

// problem3
function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') return obj

  Object.values(obj).forEach((value) => {
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value)
    }
  })

  return Object.freeze(obj)
}

// problem4
function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    get value() {
      return count;
    },
  };
}
// problem5
function validateSchema(obj, schema) {
  const errors = [];

  for (const [key, expectedType] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) {
      errors.push(`${key}: missing property`);
      continue;
    }

    const actualType = typeof obj[key];

    if (actualType !== expectedType) {
      errors.push(`${key}: expected ${expectedType}, got ${actualType}`);
    }
  }

  return errors;
}
