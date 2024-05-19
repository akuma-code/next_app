const EventIdPage = async ({ params }: { params: { eventId: string } }) => {

    const { eventId } = params
    return (
        <div>EventIdPage { eventId }</div>
    )
}

export default EventIdPage