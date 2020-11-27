const Maybe = value => ({
  isNothing: () => value === null || typeof value === 'undefined',
  map(fn){
    return this.isNothing() ? Maybe.Nothing() : Maybe(fn(value));
  },
  flatten() {
    return this.isNothing() ? Maybe.Nothing() : Maybe(value.value);
  },
  chain(fn) {
    return this.isNothing() ? Maybe.Nothing() : this.map(fn).flatten();
  },
  // allow to access the value or get a default one if none
  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : value;
  },
  value,
});

// Add Nothing Monad to avoid checking null value each time
Maybe.Nothing = () => ({
  isNothing: () => true,
  map: () => Maybe.Nothing(),
  flatten: () => Maybe.Nothing(),
  chain: fn => Maybe.Nothing(),
  getOrElse: defaultValue => defaultValue,
  value: null,
});


const Right = value => ({
  map: fn => Right(fn(value)),
  flatten: () => Right(value.value),
  chain(fn) {
    return Right(this.map(fn).flatten());
  },
  catch: fn => Right(value),
  value,
});

const Left = value => ({
  map: fn => Left(value),
  // Left never change its value so like for map, we do nothing
  flatten: () => Left(value),
  chain: () => Left(value),
  catch: fn => Right(fn(value)),
  value,
});

const tryCatch = fn => value => {
  try {
    return Right(fn(value));
  } catch (error) {
    return Left(error);
  }
};

const validateMail = tryCatch(v => {
  if (!v.match(/\S+@\S+\.\S+/)) {
    throw new Error("Invalid mail");
  }

  return v;
});

const get = key => object => object[key];

const parseMail = user =>
  Maybe(user)
    .map(get('mail'))
    .chain(mail => validateMail(mail).catch(error => error.message))
    .getOrElse('no mail');

console.log(parseMail({ name: 'foo', mail: 'bar@example.com' })); // "bar@example.com"
console.log(parseMail({ name: 'foo', mail: 'bar' })); // 'Invalid mail'
console.log(parseMail(null)); // 'no mail'

