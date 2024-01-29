// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	title: {
		/**
		 * W​e​l​c​o​m​e​ ​t​o​ ​o​u​r
		 */
		part1: string
		/**
		 * R​E​A​L
		 */
		part2: string
		/**
		 * P​o​r​t​a​l​.
		 */
		part3: string
	}
	/**
	 * L​e​a​r​n​ ​h​o​w​ ​y​o​u​r​ ​a​s​s​e​t​ ​i​s​ ​h​e​l​p​i​n​g​ ​r​e​a​l​-​w​o​r​l​d​ ​c​o​n​s​e​r​v​a​t​i​o​n​ ​e​f​f​o​r​t​s​ ​a​r​o​u​n​d​ ​t​h​e​ ​g​l​o​b​e​.
	 */
	subtitle: string
	/**
	 * C​o​l​l​e​c​t​i​o​n​:
	 */
	collection: string
	/**
	 * L​a​t​e​s​t​ ​H​i​g​h​l​i​g​h​t​s
	 */
	highlights: string
	results: {
		/**
		 * S​h​o​w​i​n​g​ ​r​e​s​u​l​t​s​ ​f​o​r
		 */
		resultsFor: string
		/**
		 * {​0​}​ ​r​e​s​u​l​t​{​{​s​}​}
		 * @param {string | number | boolean} 0
		 */
		nrResults: RequiredParams<'0'>
		/**
		 * N​o​ ​r​e​s​u​l​t​s​ ​f​o​u​n​d
		 */
		noResults: string
		/**
		 * U​h​-​o​h​!​ ​I​t​ ​l​o​o​k​s​ ​l​i​k​e​ ​a​ ​h​i​c​c​u​p​ ​i​n​ ​t​h​e​ ​w​i​l​d​!​ ​�​�​ ​
	​ ​P​l​e​a​s​e​ ​l​e​n​d​ ​a​ ​p​a​w​ ​b​y​ ​r​e​f​r​e​s​h​i​n​g​ ​t​h​e​ ​p​a​g​e​ ​a​n​d​ ​t​r​y​i​n​g​ ​a​g​a​i​n​.
		 */
		errorMessage: string
	}
	sub0: {
		/**
		 * s​u​b​0​ ​B​i​o​d​i​v​e​r​s​i​t​y
		 */
		collectionName: string
		/**
		 * F​i​n​d​ ​b​y​ ​t​o​k​e​n​ ​I​D​ ​(​1​-​1​4​6​6​)
		 */
		placeholder: string
	}
	soundwaves: {
		/**
		 * S​o​u​n​d​w​a​v​e​s
		 */
		collectionName: string
		/**
		 * F​i​n​d​ ​b​y​ ​t​o​k​e​n​ ​I​D
		 */
		placeholder: string
	}
	wallet: {
		/**
		 * S​h​o​w​i​n​g​ ​y​o​u​r​ 
		 */
		assetsFor: string
		/**
		 * {​c​o​l​l​e​c​t​i​o​n​}​ ​a​s​s​e​t​s
		 * @param {string} collection
		 */
		assetsFor_pt2: RequiredParams<'collection'>
		/**
		 * Y​o​u​ ​o​w​n​ ​{​n​r​O​f​A​s​s​e​t​s​}​ ​{​c​o​l​l​e​c​t​i​o​n​}​ ​a​s​s​e​t​{​{​s​}​}
		 * @param {string} collection
		 * @param {number} nrOfAssets
		 */
		myAssets: RequiredParams<'collection' | 'nrOfAssets'>
		/**
		 * {​0​}​ ​a​s​s​e​t​{​{​s​}​}​ ​f​o​u​n​d
		 * @param {string | number | boolean} 0
		 */
		nrAssets: RequiredParams<'0'>
		/**
		 * N​o​ ​a​s​s​e​t​s​ ​f​o​u​n​d
		 */
		noAssets: string
		/**
		 * U​h​-​o​h​!​ ​I​t​ ​l​o​o​k​s​ ​l​i​k​e​ ​a​ ​h​i​c​c​u​p​ ​i​n​ ​t​h​e​ ​w​i​l​d​!​ ​�​�​ ​
	​ ​P​l​e​a​s​e​ ​l​e​n​d​ ​a​ ​p​a​w​ ​b​y​ ​r​e​f​r​e​s​h​i​n​g​ ​t​h​e​ ​p​a​g​e​ ​a​n​d​ ​t​r​y​i​n​g​ ​a​g​a​i​n​.
		 */
		errorMessage: string
	}
	notifications: {
		/**
		 * S​e​e​ ​a​l​l​ ​n​o​t​i​f​i​c​a​t​i​o​n​s
		 */
		seeAll: string
		/**
		 * {​0​}​ ​n​o​t​i​f​i​c​a​t​i​o​n​{​{​s​}​}
		 * @param {string | number | boolean} 0
		 */
		nrNotification: RequiredParams<'0'>
		/**
		 * E​n​a​b​l​e
		 */
		subscribe: string
		/**
		 * E​n​a​b​l​e​ ​n​o​t​i​f​i​c​a​t​i​o​n​s
		 */
		subscribeCollection: string
		/**
		 * Y​o​u​ ​h​a​v​e​ ​{​n​r​O​f​N​o​t​i​f​i​c​a​t​i​o​n​s​}​ ​n​e​w​ ​n​o​t​i​f​i​c​a​t​i​o​n​{​{​s​}​}
		 * @param {number} nrOfNotifications
		 */
		newNotifications: RequiredParams<'nrOfNotifications'>
		/**
		 * Y​o​u​r​ ​n​o​t​i​f​i​c​a​t​i​o​n​ ​c​e​n​t​e​r
		 */
		notificationCenter: string
		/**
		 * N​o​t​i​f​i​c​a​t​i​o​n​ ​p​r​e​f​e​r​e​n​c​e​s
		 */
		notificationSettings: string
		/**
		 * N​o​ ​n​o​t​i​f​i​c​a​t​i​o​n​s​ ​f​o​u​n​d
		 */
		notFound: string
		/**
		 * M​e​s​s​a​g​e​ ​D​e​l​e​t​e​d
		 */
		deleted: string
		/**
		 * l​o​a​d​i​n​g​.​.​.
		 */
		loading: string
		/**
		 * c​o​n​n​e​c​t​i​n​g​.​.​.
		 */
		connecting: string
		/**
		 * S​a​v​e​ ​p​r​e​f​e​r​e​n​c​e​s
		 */
		savePreferences: string
	}
	web2: {
		search: {
			/**
			 * S​e​a​r​c​h​ ​f​o​r​ ​y​o​u​r​ ​a​s​s​e​t
			 */
			label: string
			/**
			 * A​s​s​e​t​ ​n​a​m​e
			 */
			placeholder: string
		}
	}
	assets: {
		/**
		 * R​E​A​L​ ​b​y​ ​S​N​I​ ​|​ ​{​a​s​s​e​t​N​a​m​e​}
		 * @param {string} assetName
		 */
		title: RequiredParams<'assetName'>
		intro: {
			/**
			 * W​e​l​c​o​m​e​ ​t​o​ ​t​h​e​ ​P​o​l​k​a​d​o​t​ ​s​u​b​0​ ​b​i​o​d​i​v​e​r​s​i​t​y​ ​c​o​l​l​e​c​t​i​o​n​.​ ​Y​o​u​r​ ​c​o​n​t​r​i​b​u​t​i​o​n​ ​m​a​k​e​s​ ​a​ ​R​E​A​L​ ​d​i​f​f​e​r​e​n​c​e​.​ ​C​o​n​n​e​c​t​ ​w​i​t​h​ ​t​h​e​ ​m​a​r​i​n​e​ ​b​i​o​d​i​v​e​r​s​i​t​y​ ​s​e​r​v​e​d​ ​b​y​ ​t​h​e​ ​o​r​g​a​n​i​s​a​t​i​o​n​ ​A​I​M​M​ ​P​o​r​t​u​g​a​l​.
			 */
			sub0: string
		}
		/**
		 * V​e​r​i​f​i​e​d​:
		 */
		verified: string
		/**
		 * S​h​a​r​e​ ​y​o​u​r​ ​a​s​s​e​t
		 */
		shareText: string
		funds: {
			/**
			 * F​u​n​d​s​ ​g​e​n​e​r​a​t​e​d​ ​s​o​ ​f​a​r​:
			 */
			cardTitle: string
			/**
			 * B​y​ ​t​h​i​s​ ​a​s​s​e​t
			 */
			labelAsset: string
			/**
			 * T​o​t​a​l
			 */
			labelTotal: string
		}
		ecSteward: {
			/**
			 * E​c​o​l​o​g​i​c​a​l​ ​S​t​e​w​a​r​d
			 */
			title: string
			/**
			 * E​c​o​l​o​g​i​c​a​l​ ​S​t​e​w​a​r​d​ ​(​E​S​)​:​ ​a​n​ ​i​d​e​n​t​i​f​i​e​d​ ​c​o​n​s​e​r​v​a​t​i​o​n​/​r​e​s​t​o​r​a​t​i​o​n​ ​g​r​o​u​p​,​ ​b​e​i​n​g​ ​a​n​ ​o​r​g​a​n​i​s​a​t​i​o​n​ ​(​e​.​g​.​ ​K​W​T​)​ ​o​r​ ​a​ ​c​o​m​m​u​n​i​t​y​,​ ​g​r​o​u​p​ ​o​f​ ​s​t​a​k​e​h​o​l​d​e​r​s​ ​w​h​o​ ​h​a​s​ ​a​l​s​o​ ​t​h​e​ ​m​a​n​d​a​t​e​ ​t​o​ ​m​a​n​a​g​e​ ​t​h​e​ ​f​u​n​d​s​ ​r​a​i​s​e​d
			 */
			description: string
		}
		ecEntity: {
			/**
			 * C​o​l​l​e​c​t​i​n​g​ ​f​u​n​d​s​ ​f​o​r​:
			 */
			cardTitle: string
			/**
			 * A​n​i​m​a​l​ ​s​t​a​t​s​:
			 */
			propsTitle: string
			/**
			 * E​c​o​l​o​g​i​c​a​l​ ​E​n​t​i​t​y
			 */
			title: string
			/**
			 * E​c​o​l​o​g​i​c​a​l​ ​E​n​t​i​t​y​:​ ​a​n​ ​i​d​e​n​t​i​f​i​e​d​ ​p​i​e​c​e​ ​o​f​ ​e​c​o​l​o​g​y​ ​t​h​e​ ​E​c​o​l​o​g​i​c​a​l​ ​S​t​e​w​a​r​d​ ​(​E​S​)​ ​f​o​c​u​s​e​s​ ​o​n​,​ ​t​h​a​t​ ​b​e​i​n​g​ ​a​ ​s​p​e​c​i​f​i​c​ ​s​p​e​c​i​e​s​ ​p​o​p​u​l​a​t​i​o​n​ ​(​p​r​e​d​a​t​o​r​s​ ​o​f​ ​t​h​e​ ​M​a​a​s​a​i​ ​M​a​r​a​)​ ​o​r​ ​a​n​ ​e​c​o​s​y​s​t​e​m​ ​(​t​h​e​ ​U​p​e​m​b​a​ ​N​a​t​i​o​n​a​l​ ​P​a​r​k​)
			 */
			description: string
			/**
			 * T​r​a​c​e​s​ ​R​e​c​o​r​d​e​d
			 */
			traces: string
		}
	}
	social: {
		shareCard: {
			/**
			 * R​E​A​L​ ​b​y​ ​S​o​v​e​r​e​i​g​n​ ​N​a​t​u​r​e​ ​I​n​i​t​i​a​t​i​v​e
			 */
			title: string
			/**
			 * T​h​e​ ​e​c​o​-​d​a​t​a​ ​p​i​p​e​l​i​n​e​ ​t​o​ ​c​o​n​n​e​c​t​ ​r​e​a​l​ ​l​i​f​e​ ​e​c​o​l​o​g​y​ ​w​i​t​h​ ​t​h​e​ ​d​i​g​i​t​a​l​ ​w​o​r​l​d​.
			 */
			description: string
		}
		og: {
			/**
			 * T​o​k​e​n​ ​I​D​:
			 */
			token: string
			/**
			 * S​o​u​r​c​e​:
			 */
			source: string
			/**
			 * T​o​t​a​l​ ​f​u​n​d​s​ ​g​e​n​e​r​a​t​e​d​ ​t​o​ ​d​a​t​e​:
			 */
			fundsGenerated: string
		}
		/**
		 * L​o​o​k​ ​a​t​ ​m​y​ ​e​c​o​-​l​i​n​k​e​d​ ​a​s​s​e​t​ ​b​y​ ​@​s​o​v​e​r​e​i​g​n​n​a​t​u​r​e
		 */
		twitterPrefix: string
		/**
		 * L​o​o​k​ ​a​t​ ​m​y​ ​e​c​o​-​l​i​n​k​e​d​ ​a​s​s​e​t​ ​b​y​ ​S​o​v​e​r​e​i​g​n​ ​N​a​t​u​r​e​ ​I​n​i​t​i​a​t​i​v​e
		 */
		telegramPrefix: string
	}
	footer: {
		/**
		 * S​u​b​s​c​r​i​b​e​ ​t​o​ ​o​u​r​ ​m​a​i​l​i​n​g​ ​l​i​s​t
		 */
		mailing: string
		/**
		 * T​e​r​m​s​ ​&​ ​C​o​n​d​i​t​i​o​n​s
		 */
		terms: string
		/**
		 * P​r​i​v​a​c​y​ ​P​o​l​i​c​y
		 */
		privacy: string
	}
	news: {
		/**
		 * R​e​a​d​ ​m​o​r​e
		 */
		readMore: string
		/**
		 * C​l​o​s​e
		 */
		close: string
	}
	colorTheme: {
		/**
		 * A​u​t​o
		 */
		auto: string
		/**
		 * L​i​g​h​t​ ​M​o​d​e
		 */
		light: string
		/**
		 * N​i​g​h​t​ ​M​o​d​e
		 */
		dark: string
	}
	errors: {
		/**
		 * O​o​p​s​!​ ​T​h​e​ ​a​s​s​e​t​ ​i​m​a​g​e​ ​c​o​u​l​d​n​'​t​ ​m​a​k​e​ ​i​t​ ​t​o​ ​t​h​e​ ​h​a​b​i​t​a​t​.​�​�​ ​
	​ ​P​l​e​a​s​e​ ​t​r​y​ ​a​g​a​i​n​ ​l​a​t​e​r​.
		 */
		image: string
		/**
		 * T​r​y​ ​s​e​a​r​c​h​i​n​g​ ​f​o​r​ ​a​n​o​t​h​e​r​ ​a​s​s​e​t​.​.​.
		 */
		notFoundTitle: string
		/**
		 * S​e​a​r​c​h​ ​f​o​r​ ​y​o​u​r​ ​a​s​s​e​t​ ​t​o​ ​v​e​r​i​f​y
		 */
		errorPageTitle: string
	}
}

export type TranslationFunctions = {
	title: {
		/**
		 * Welcome to our
		 */
		part1: () => LocalizedString
		/**
		 * REAL
		 */
		part2: () => LocalizedString
		/**
		 * Portal.
		 */
		part3: () => LocalizedString
	}
	/**
	 * Learn how your asset is helping real-world conservation efforts around the globe.
	 */
	subtitle: () => LocalizedString
	/**
	 * Collection:
	 */
	collection: () => LocalizedString
	/**
	 * Latest Highlights
	 */
	highlights: () => LocalizedString
	results: {
		/**
		 * Showing results for
		 */
		resultsFor: () => LocalizedString
		/**
		 * {0} result{{s}}
		 */
		nrResults: (arg0: string | number | boolean) => LocalizedString
		/**
		 * No results found
		 */
		noResults: () => LocalizedString
		/**
		 * Uh-oh! It looks like a hiccup in the wild! 🐾 
	 Please lend a paw by refreshing the page and trying again.
		 */
		errorMessage: () => LocalizedString
	}
	sub0: {
		/**
		 * sub0 Biodiversity
		 */
		collectionName: () => LocalizedString
		/**
		 * Find by token ID (1-1466)
		 */
		placeholder: () => LocalizedString
	}
	soundwaves: {
		/**
		 * Soundwaves
		 */
		collectionName: () => LocalizedString
		/**
		 * Find by token ID
		 */
		placeholder: () => LocalizedString
	}
	wallet: {
		/**
		 * Showing your 
		 */
		assetsFor: () => LocalizedString
		/**
		 * {collection} assets
		 */
		assetsFor_pt2: (arg: { collection: string }) => LocalizedString
		/**
		 * You own {nrOfAssets} {collection} asset{{s}}
		 */
		myAssets: (arg: { collection: string, nrOfAssets: number }) => LocalizedString
		/**
		 * {0} asset{{s}} found
		 */
		nrAssets: (arg0: string | number | boolean) => LocalizedString
		/**
		 * No assets found
		 */
		noAssets: () => LocalizedString
		/**
		 * Uh-oh! It looks like a hiccup in the wild! 🐾 
	 Please lend a paw by refreshing the page and trying again.
		 */
		errorMessage: () => LocalizedString
	}
	notifications: {
		/**
		 * See all notifications
		 */
		seeAll: () => LocalizedString
		/**
		 * {0} notification{{s}}
		 */
		nrNotification: (arg0: string | number | boolean) => LocalizedString
		/**
		 * Enable
		 */
		subscribe: () => LocalizedString
		/**
		 * Enable notifications
		 */
		subscribeCollection: () => LocalizedString
		/**
		 * You have {nrOfNotifications} new notification{{s}}
		 */
		newNotifications: (arg: { nrOfNotifications: number }) => LocalizedString
		/**
		 * Your notification center
		 */
		notificationCenter: () => LocalizedString
		/**
		 * Notification preferences
		 */
		notificationSettings: () => LocalizedString
		/**
		 * No notifications found
		 */
		notFound: () => LocalizedString
		/**
		 * Message Deleted
		 */
		deleted: () => LocalizedString
		/**
		 * loading...
		 */
		loading: () => LocalizedString
		/**
		 * connecting...
		 */
		connecting: () => LocalizedString
		/**
		 * Save preferences
		 */
		savePreferences: () => LocalizedString
	}
	web2: {
		search: {
			/**
			 * Search for your asset
			 */
			label: () => LocalizedString
			/**
			 * Asset name
			 */
			placeholder: () => LocalizedString
		}
	}
	assets: {
		/**
		 * REAL by SNI | {assetName}
		 */
		title: (arg: { assetName: string }) => LocalizedString
		intro: {
			/**
			 * Welcome to the Polkadot sub0 biodiversity collection. Your contribution makes a REAL difference. Connect with the marine biodiversity served by the organisation AIMM Portugal.
			 */
			sub0: () => LocalizedString
		}
		/**
		 * Verified:
		 */
		verified: () => LocalizedString
		/**
		 * Share your asset
		 */
		shareText: () => LocalizedString
		funds: {
			/**
			 * Funds generated so far:
			 */
			cardTitle: () => LocalizedString
			/**
			 * By this asset
			 */
			labelAsset: () => LocalizedString
			/**
			 * Total
			 */
			labelTotal: () => LocalizedString
		}
		ecSteward: {
			/**
			 * Ecological Steward
			 */
			title: () => LocalizedString
			/**
			 * Ecological Steward (ES): an identified conservation/restoration group, being an organisation (e.g. KWT) or a community, group of stakeholders who has also the mandate to manage the funds raised
			 */
			description: () => LocalizedString
		}
		ecEntity: {
			/**
			 * Collecting funds for:
			 */
			cardTitle: () => LocalizedString
			/**
			 * Animal stats:
			 */
			propsTitle: () => LocalizedString
			/**
			 * Ecological Entity
			 */
			title: () => LocalizedString
			/**
			 * Ecological Entity: an identified piece of ecology the Ecological Steward (ES) focuses on, that being a specific species population (predators of the Maasai Mara) or an ecosystem (the Upemba National Park)
			 */
			description: () => LocalizedString
			/**
			 * Traces Recorded
			 */
			traces: () => LocalizedString
		}
	}
	social: {
		shareCard: {
			/**
			 * REAL by Sovereign Nature Initiative
			 */
			title: () => LocalizedString
			/**
			 * The eco-data pipeline to connect real life ecology with the digital world.
			 */
			description: () => LocalizedString
		}
		og: {
			/**
			 * Token ID:
			 */
			token: () => LocalizedString
			/**
			 * Source:
			 */
			source: () => LocalizedString
			/**
			 * Total funds generated to date:
			 */
			fundsGenerated: () => LocalizedString
		}
		/**
		 * Look at my eco-linked asset by @sovereignnature
		 */
		twitterPrefix: () => LocalizedString
		/**
		 * Look at my eco-linked asset by Sovereign Nature Initiative
		 */
		telegramPrefix: () => LocalizedString
	}
	footer: {
		/**
		 * Subscribe to our mailing list
		 */
		mailing: () => LocalizedString
		/**
		 * Terms & Conditions
		 */
		terms: () => LocalizedString
		/**
		 * Privacy Policy
		 */
		privacy: () => LocalizedString
	}
	news: {
		/**
		 * Read more
		 */
		readMore: () => LocalizedString
		/**
		 * Close
		 */
		close: () => LocalizedString
	}
	colorTheme: {
		/**
		 * Auto
		 */
		auto: () => LocalizedString
		/**
		 * Light Mode
		 */
		light: () => LocalizedString
		/**
		 * Night Mode
		 */
		dark: () => LocalizedString
	}
	errors: {
		/**
		 * Oops! The asset image couldn't make it to the habitat.🐾 
	 Please try again later.
		 */
		image: () => LocalizedString
		/**
		 * Try searching for another asset...
		 */
		notFoundTitle: () => LocalizedString
		/**
		 * Search for your asset to verify
		 */
		errorPageTitle: () => LocalizedString
	}
}

export type Formatters = {}
