import { query as q } from 'faunadb';

import { fauna } from "../../../service/fauna";
import { stripe } from '../../../service/stripe';

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
) {
    console.log(subscriptionId, customerId);

    const userRef = await fauna.query(
        q.Select(
            'ref',
            q.Get(
                q.Match(
                    q.Index("customers_by_id"),
                    customerId,
                ),
            )
        )
    );

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    await fauna.query(
        q.Create(
            q.Collection("subscriptions"),
            { data: subscription}
        )
    )
}