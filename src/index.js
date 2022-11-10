export async function enter({element, transition}) {
    element.classList.remove('hidden');

    element.classList.add(`${transition}-enter`);
    element.classList.add(`${transition}-enter-from`);

    await nextFrame();

    element.classList.remove(`${transition}-enter-from`);
    element.classList.add(`${transition}-enter-to`);

    await afterTransition(element);

    element.classList.remove(`${transition}-enter-to`);
    element.classList.remove(`${transition}-enter`);
}

export async function leave({element, transition}) {
    element.classList.add(`${transition}-leave`);
    element.classList.add(`${transition}-leave-from`);

    await nextFrame();

    element.classList.remove(`${transition}-leave-from`);
    element.classList.add(`${transition}-leave-to`);

    await afterTransition(element);

    element.classList.remove(`${transition}-leave-to`);
    element.classList.remove(`${transition}-leave`);

    element.classList.add('hidden');
}

export async function fadeOut(element) {
    return leave({element, transition: 'fade'});
}
export async function fadeIn(element) {
    return enter({element, transition: 'fade'});
}
export async function slideDown(element) {
    return leave({element, transition: 'slide-up'});
}
export async function slideUp(element) {
    return enter({element, transition: 'slide-up'});
}

/**
 * Leave one, show two. Or vice versa if two is hidden
 * @param items
 * @param state
 * @param transition
 * @returns {Promise<boolean>}
 */
export async function toggleTransition(items, {state = false, transition = 'fade'} = {}) {
    if (state) {
        await leave({element: items[1], transition});
        await enter({element: items[0], transition});
        return Promise.resolve(state);
    }

    await leave({element: items[0], transition});
    await enter({element: items[1], transition});
    return Promise.resolve(state);
}

export function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });
}

function afterTransition(element) {
    return new Promise(resolve => {
        const duration = Number(
            getComputedStyle(element)
                .transitionDuration
                .replace('s', '')
        ) * 1000;

        setTimeout(() => {
            resolve();
        }, duration);
    });
}
