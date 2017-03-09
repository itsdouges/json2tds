// @flow

type Options = {
  destination: string,
};

type Data = {
  [key: any]: any,
};

export default function itemGenerator(data: Data, { destination }: Options) {
  console.log(data);
}
