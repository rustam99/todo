import Vue from 'vue';
import Vuex from 'vuex';
// начальные значения, так как нет сервера изменения происходят синхроно через мутацию без actions
import groupList from '@/assets/data/groups';
import cardList from '@/assets/data/cardList';

Vue.use(Vuex);

function actionWithCardGroup(state, groupId, id, fn) {
	for (let i = 0; i < state.groupList.length; i++) {
		const group = state.groupList[i];

		if (group.id === groupId) {
			for (let j = 0; j < group.cards.length; j++) {
				const cards = group.cards;

				if (cards[j].id === id) {
					return fn(cards, j);
				}
			}
		}
	}

	return undefined;
}
export default new Vuex.Store({
	state: {
		groupList,
		cardList,
		filterSearch: false,
		filterStatus: {},
	},
	getters: {
		getCardFromCardList: (state) => (id) => {
			const map = {};

			for (let i = 0; i < state.cardList.length; i++) {
				const card = state.cardList[i];

				map[card.id] = card;
			}

			return map[id];
		},
		getGroupById: (state) => (id) => {
			const map = {};

			for (let i = 0; i < state.groupList.length; i++) {
				const group = state.groupList[i];

				map[group.id] = group;
			}
			return map[id];
		},
		getCardByGroupId: (state) => (data) => actionWithCardGroup(
			state,
			data.groupId,
			data.id,
			(cards, index) => cards[index],
		),
	},
	mutations: {
		changeStatus(state, data) {
			for (let i = 0; i < state.cardList.length; i++) {
				if (state.cardList[i].id === data.id) {
					state.cardList[i].status = data.status;
				}
			}
		},
		changeStatusByGroupId(state, data) {
			actionWithCardGroup(state, data.groupId, data.id, (cards, index) => {
				const list = cards;

				list[index].status = data.status;
			});
		},
		deleteCardById(state, id) {
			for (let i = 0; i < state.cardList.length; i++) {
				if (state.cardList[i].id === id) {
					state.cardList.splice(i, 1);
				}
			}
		},
		deleteCardByGroupId(state, data) {
			actionWithCardGroup(state, data.groupId, data.id, (cards, index) => {
				cards.splice(index, 1);
			});
		},
		addCardToCardList(state, data) {
			state.cardList.unshift(data);
		},
		addCardToGroupCardList(state, data) {
			for (let i = 0; i < state.groupList.length; i++) {
				if (state.groupList[i].id === data.id) {
					state.groupList[i].cards.unshift(data.card);
				}
			}
		},
		addGroup(state, group) {
			state.groupList.unshift(group);
		},
		deleteGroupById(state, id) {
			for (let i = 0; i < state.groupList.length; i++) {
				if (state.groupList[i].id === id) {
					state.groupList.splice(i, 1);
				}
			}
		},
		setFilterStatus(state, status) {
			state.filterStatus = {
				status: status.status,
				performed: status.performed,
			};
		},
		setfilterSearch(state, value) {
			state.filterSearch = value;
		},
	},
	actions: {},
});
