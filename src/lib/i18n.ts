import ru from '@/localization/ru/translation.json';
import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const defaultLng = getLocales();
console.log(defaultLng, 'default');

i18next.use(initReactI18next).init({
	lng: 'en', // if you're using a language detector, do not define the lng option
	debug: true,
	resources: {
		ru: {
			translation: ru,
		},
	},
	// if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
	// set returnNull to false (and also in the i18next.d.ts options)
	// returnNull: false,
});
