export class Utilities {
	public static removeUndefined(obj: any) {
		const res: object = (Object).assign({}, obj);

		for (const key of Object.keys(obj)) {
			if (obj[key] === undefined) {
				delete obj[key];
			}
		}
		return res;
	}

	public static generateQuerySting(queryObject: object) {
		const builder: string[] = [];
		for (const key in queryObject) {
			if (queryObject.hasOwnProperty(key) && !Utilities.isObjectEmpty(queryObject[key])) {
				builder.push(`${key}=${queryObject[key]}`);
			}
		}

		return `${encodeURI(builder.join('&'))}`;
	}

	public static isObjectEmpty(obj: any) {
		if (obj === undefined || obj === null || obj === '') {
			return true;
		}
		return false;
	}
}
