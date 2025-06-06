"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import EventSheet from "./event-sheet";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CalendarEvent, CalendarCategory } from "@/app/api/calendars/data";
import { EventContentArg } from "@fullcalendar/core";
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
interface CalendarViewProps {
  events: CalendarEvent[];
  categories: CalendarCategory[];
}

const CalendarView = ({ events, categories }: CalendarViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string[] | null>(
    null
  );
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  // event canvas state
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const [dragEvents] = useState([
    { title: "New Event Planning", id: "101", tag: "business" },
    { title: "Meeting", id: "102", tag: "meeting" },
    { title: "Generating Reports", id: "103", tag: "holiday" },
    { title: "Create New theme", id: "104", tag: "etc" },
  ]);

  useEffect(() => {
    setSelectedCategory(categories?.map((c) => c.value));
  }, [events, categories]);

  useEffect(() => {
    const draggableEl = document.getElementById("external-events");

    const initDraggable = () => {
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            let event = dragEvents.find((e) => e.id === id);
            let tag = event ? event.tag : "";
            return {
              title: title,
              id: id,
              extendedProps: {
                calendar: tag,
              },
            };
          },
        });
      }
    };

    if (dragEvents.length > 0) {
      initDraggable();
    }

    return () => {
      draggableEl?.removeEventListener("mousedown", initDraggable);
    };
  }, [dragEvents]);
  // event click

  // handle close modal
  const handleCloseModal = () => {
    setSheetOpen(false);
    setSelectedEvent(null);
    setSelectedEventDate(null);
  };

  const handleClassName = (arg: EventContentArg) => {
    if (arg.event.extendedProps.calendar === "holiday") {
      return "destructive";
    } else if (arg.event.extendedProps.calendar === "business") {
      return "primary";
    } else if (arg.event.extendedProps.calendar === "personal") {
      return "success";
    } else if (arg.event.extendedProps.calendar === "family") {
      return "info";
    } else if (arg.event.extendedProps.calendar === "etc") {
      return "info";
    } else if (arg.event.extendedProps.calendar === "meeting") {
      return "warning";
    } else {
      return "primary";
    }
  };

  const filteredEvents = events?.filter((event) =>
    selectedCategory?.includes(event.extendedProps.calendar)
  );

  return (
    <>
      <div className=" grid grid-cols-12 gap-6 divide-x  divide-border">
        <Card className="col-span-12   pt-5">
          <CardContent className="dash-tail-calendar">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              events={filteredEvents}
              editable={true}
              rerenderDelay={10}
              eventDurationEditable={false}
              selectable={true}
              selectMirror={true}
              droppable={true}
              dayMaxEvents={2}
              weekends={true}
              eventClassNames={handleClassName}
              initialView="dayGridMonth"
            />
          </CardContent>
        </Card>
      </div>
      <EventSheet
        open={sheetOpen}
        onClose={handleCloseModal}
        categories={categories}
        event={selectedEvent}
        selectedDate={selectedEventDate}
      />
    </>
  );
};

export default CalendarView;
